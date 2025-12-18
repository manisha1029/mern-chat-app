import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../config/generateToken.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // Validate inputs
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }

  // Check if user exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatched = await user?.comparePassword(password);
  if (user && isPasswordMatched) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email,
      pic: user.avatar,
      token: generateToken(user._id),
    })
  }
  else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
})

export const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    $or:[
      {name : { $regex: req.query.search, $options: "i" }},
      {email : { $regex: req.query.search, $options: "i" }},
    ]
  } : {};
  const users = await User.find(keyword).find({_id: { $ne: req.user._id}})
  res.status(200).json(users);
  console.log("Keyword:", keyword);
})
