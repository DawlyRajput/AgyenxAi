import { getAuth } from 'firebase-admin/auth';
import { app } from '../config/firebase.js';
import User from '../models/user.model.js';
import crypto from 'crypto'; // 👈 Add this missing import back
import redis from '../../../shared/redis/redis.js'; // 👈 Add this missing import back

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);
    
    let user = await User.findOne({ firebaseId: decoded.uid });
    
    if (!user) {
      user = await User.create({
        firebaseId: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture
      });
    }

    const sessionId = crypto.randomUUID(); // Now this will work safely
    
     await redis.set(`session:${sessionId}`,
       JSON.stringify({ 
        userId: user._id ,
      name: user.name,
      email: user.email,
      avatar: user.avatar
     }), 
       'EX', 
       60 * 60 * 24 * 7
      ); // 7 days

  
    res.cookie('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies.session;
    await redis.del(`session:${sessionId}`);
    res.clearCookie('session');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};