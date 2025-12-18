import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decode.id).select("-password"); // Exclude password field
            next();
        } catch (error) {
            res.status(401);
            throw new Error("User Not authorized, token failed");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("No token, authorization denied");
    }

})