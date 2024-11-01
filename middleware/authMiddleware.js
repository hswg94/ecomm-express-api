import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// User Authentication
const userAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin Authorization

const adminAuth = asyncHandler(async (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user.isVendor)) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized");
    }
});

export { userAuth, adminAuth };