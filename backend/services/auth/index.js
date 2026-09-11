import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the connectDB function
import router from "./routes/auth.route.js"; // Import the router
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/', router)
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Auth Server is running"
    });
});

 app.listen(PORT,  () => {
    console.log(`Auth Server is running on port ${PORT}`);
    connectDB(); // Call the connectDB function to establish the database connection
});

