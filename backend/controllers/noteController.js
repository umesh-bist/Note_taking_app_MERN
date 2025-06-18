//@ts-nocheck
import Note from "../models/noteModel.js";

export const getNotes = async (req, res) => {
  const note = await Note.find({ userid: req.user.id });
  res.json(note);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findByIdAndDelete({ _id: req.params.id });
  if (!note) {
    const error = new Error("Note not Found");
    error.statusCode = 400;
    throw error;
  }
  res.status(200).json({ message: "note has been deleted successfully" });
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    userid: req.user.id,
  });

  res.status(201).json(note);
};

export const editNote = async (req, res) => {
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
    const error = new Error("Note not Found");
    error.statusCode = 400;
    throw error;
  }

  res.status(200).json({
    note,
  });
};
