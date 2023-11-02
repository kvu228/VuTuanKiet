import express, { Request, Response, json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.config";
import { Router } from "express";
import { router } from "./routes/routes";

dotenv.config();

connectDB();

const app = express();

var corOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing routes
app.get("/test", (req: Request, res: Response) => {
    res.json({ message: "Test API" });
});

//routes
app.use("/api/v1/resources", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
