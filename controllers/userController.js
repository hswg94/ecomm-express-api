import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc    Register user
// @route   POST /api/users/
// @access  Public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    generateToken(user._id, res);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVendor: user.isVendor
    });
  }
});

// @desc    Auth user & get Token
// @route   POST /api/users/login
// @access  Public

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const isValidPassword = await user.matchPassword(password);
    if (isValidPassword) {
      generateToken(user._id, res);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVendor: user.isVendor,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { 
    httpOnly: true,
    expires: new Date(0),
  }),
    res.status(200).json({ message: "Logged Out Successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVendor: user.isVendor
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
  res.send("Get user profile");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const userUpdate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVendor: updatedUser.isVendor
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Admin

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get All Users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete Users
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isVendor = Boolean(req.body.isVendor);
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVendor: updatedUser.isVendor,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  userLogin,
  userRegister,
  userLogout,
  userProfile,
  userUpdate,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser,
};
