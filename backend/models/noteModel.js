import { timeStamp } from "console";
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,

    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
