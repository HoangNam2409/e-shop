import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./db/Database.js";

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for handling uncaught exceptionX");
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: "config/.env",
    });
}

// Connect to server
connectDatabase()

// Create server
const server = app.listen(process.env.PORT, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
);

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log("Shutting down the server for unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    });
});
