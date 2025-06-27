var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const postUserDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exist");
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        yield user.save();
        res.status(201).json({
            message: "User registered successfully",
            name: user.name
        });
    }
    catch (err) {
        next(err);
    }
});
export const getEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (typeof email !== "string") {
            res.status(400).json({ exists: false, error: "Invalid email query" });
            return;
        }
        const user = yield User.findOne({ email });
        res.json({ exists: !!user });
    }
    catch (err) {
        next(err);
    }
});
export const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 400;
            throw error;
        }
        const userMatched = yield bcrypt.compare(password, user.password);
        if (!userMatched) {
            const error = new Error("Password not matched");
            error.statusCode = 400;
            throw error;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });
        res.json({
            token,
            name: user.name
        });
    }
    catch (err) {
        next(err);
    }
});
