//@ts-nocheck
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/authRoute.js";
import routers from "./routes/noteRoute.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
  throw new Error("undefined uri for the database");
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("the database has been connected successfully");
  })
  .catch((err) => console.log("error with", err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "the backend is working" });
});

app.use("/api/auth", router);

app.use("/api/auth/notes", routers);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`the server is running at port ${process.env.PORT}`);
});
