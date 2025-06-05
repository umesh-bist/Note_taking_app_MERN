
import Note from "../models/noteModel.js"
import express from "express";
import verifyToken from "../middleware/middleware.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const routers = express.Router();

routers.get("/note", verifyToken, async (req, res) => {
  try {
    const note = await Note.find({ userid: req.user.id });
    res.json(note);
    // console.log(note)
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
routers.post("/create", verifyToken, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  // console.log("the data and content",title,content)

  try {
    const note = await Note.create({
      title,
      content,
      userid: req.user.id,

    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

routers.delete("/:id", verifyToken, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete({ _id: req.params.id });
    if (!note) {
      return res.status(400).json({ error: "note not found" });
    }
    res.status(200).json({ message: "note has been deleted successfully" });
  } catch (error) {
    console.error("delete error", error);
    res.status(500).json({ error: "server error" });
  }
});

routers.put("/edit/:id", verifyToken, async (req, res) => {
  try {
    // console.log(req.params.id)

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(400).json({ error: "note not found" });
    }

    res.status(200).json({
     
      note,
    });
  } catch (error) {
    console.error("delete error", error);
    res.status(500).json({ error: "server error" });
  }
});

export default routers;
