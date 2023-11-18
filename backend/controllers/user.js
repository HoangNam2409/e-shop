import express from "express";
import path from "path";
import upload from "../multer.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from 'fs'

const router = express.Router();

router.post("/create-user", upload.single("avatar"), async (req, res, next) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
            } else {
                res.json({ message: "File deleted successfully" });
            }
        });
        return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
        name,
        email,
        password,
        avatar: fileUrl,
    };

    const newUser = await User.create(user);
    res.status(201).json({
        success: true,
        newUser,
    });
});

export default router;
