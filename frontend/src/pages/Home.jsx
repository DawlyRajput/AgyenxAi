import React from "react"; 
import { auth, googleProvider } from "../../utils/firebase"; 
import { signInWithPopup } from "firebase/auth"; 
import api from "../../utils/axios.js"; 
import { FcGoogle } from "react-icons/fc"; 
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import SideBar from "../components/SideBar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import Artifact from "../components/Artifact.jsx";

const Home = () => { 

    const {userData} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    console.log("User data from Redux store:", userData);

  const handleLogin = async (token) => { 
    try { 
      const { data } = await api.post('/api/auth/login', { token }); 
    //   console.log("Backend response saved user data:", data); 
    dispatch(setUserData(data)); // Update Redux store with user data
    } catch (error) { 
      console.error("Backend Error:", error.response?.data || error.message); 
    } 
  }; 

  const handleGoogleLogin = async () => { 
    try { 
      const result = await signInWithPopup(auth, googleProvider); 
      const token = await result.user.getIdToken(); 
      console.log("Firebase ID Token:", token); 
      await handleLogin(token); 
      console.log(result); 
    } catch (authError) { 
      console.error("Firebase Auth Error:", authError.message); 
    } 
  }; 

  return ( 
    <div className="w-full h-screen min-w-0 bg-black flex text-white overflow-hidden "> 

   <SideBar/>
   <ChatArea/>
   <Artifact/>




    {!userData && 
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"> 
        <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5"> 
          
          {/* FIXED: Added missing className attribute below */}
          <div className="flex flex-col gap-1"> 
            <h2 className="text-2xl font-semibold mb-4"> Welcome to Agenyx </h2> 
            <p className="text-[13px] text-slate-400"> Please log in with Google to continue. </p> 
          </div> 

          <button 
            className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 active:from-indigo-600 active:to-violet-700 border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer' 
            onClick={handleGoogleLogin}
          > 
            {/* FIXED: Removed text-white so the Google colors display correctly */}
            <FcGoogle size={15} /> 
            Continue With Google 
          </button> 
        </div> 
      </div> }
    
    </div> 
  ); 
}; 

export default Home;
