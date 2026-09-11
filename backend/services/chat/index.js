import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the connectDB function
import router from "./routes/chat.routes.js"; // Import the router


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)

// app.use('/', router)
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "chat Server is running"
    });
});

 app.listen(PORT,  () => {
    console.log(`chat Server is running on port ${PORT}`);
    connectDB(); // Call the connectDB function to establish the database connection
});

