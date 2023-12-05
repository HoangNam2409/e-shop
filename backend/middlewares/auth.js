import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decode.id);

    next();
});
