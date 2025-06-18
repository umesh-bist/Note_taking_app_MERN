//@ts-nocheck
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postUserDetail = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exist");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.status(201).json({
    message: "User registered successfully",
    name: user.name,
  });
};

export const getEmail = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  const userMatched = await bcrypt.compare(password, user.password);
  if (!userMatched) {
    const error = new Error("Password not matched");
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    token,
    name: user.name,
  });
};
