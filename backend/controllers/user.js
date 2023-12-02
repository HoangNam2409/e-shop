import express from "express";
import path from "path";
import upload from "../multer.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Sign up
router.post("/create-user", upload.single("avatar"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Error deleting file" });
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

        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:5173/activation/${activationToken}`;

        try {
            await sendMail({
                email: user.email,
                subject: "Activation your account",
                message: `Hello ${user.name}, please click on the link to activate your account ${activationUrl}`,
            });

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account`,
            });
        } catch (error) {
            return new ErrorHandler(error.message, 500);
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

// activate user
router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { activation_token } = req.body;
            const newUser = jwt.verify(
                activation_token,
                process.env.ACTIVATION_SECRET
            );

            if (!newUser) {
                return next(new ErrorHandler("Invalid Token", 400));
            }

            const { name, email, password, avatar } = newUser;

            let user = await User.findOne({ email: email });

            if (user) {
                return next(new ErrorHandler("User already exists", 400));
            }

            user = await User.create({
                name,
                email,
                password,
                avatar,
            });

            sendToken(user, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// Log In User
router.post(
    "/login-user",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(
                    new ErrorHandler("Please provide the all fields!", 400)
                );
            }
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return next(new ErrorHandler("User doesn't exist!", 400));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler(
                        "Please provide the correct password!",
                        400
                    )
                );
            }

            sendToken(user, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

export default router;
