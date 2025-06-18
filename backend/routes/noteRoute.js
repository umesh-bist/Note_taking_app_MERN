import express from "express";
import verifyToken from "../middleware/verifyTokenHandler.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createNote, deleteNote, editNote, getNotes } from "../controllers/noteController.js";

const routers = express.Router();

routers.get("/note", verifyToken, asyncHandler(getNotes));

routers.post("/create", verifyToken, asyncHandler(createNote));

routers.delete("/:id", verifyToken, asyncHandler(deleteNote));

routers.put("/edit/:id", verifyToken, asyncHandler(editNote));

export default routers;
