import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ErrorHandler from "./middlewares/error.js";
import cors from "cors";

// Import routes
import user from "./controllers/user.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: "config/.env",
    });
}

// Routes
app.use("/api/v2/user", user);

// it's for ErrorHandling
app.use(ErrorHandler);

export default app;
