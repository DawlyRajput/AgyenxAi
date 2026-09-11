import "dotenv/config";
import express from "express";

import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get("/", (req, res) => {
    res.json({
        message: "Agent Server is running"
    });
});

app.listen(PORT, () => {
    console.log(`Agent Server is running on port ${PORT}`);
    connectDB();
});