import dotenv from "dotenv";
import mongoose from "mongoose";
import Showtime from "../models/ShowTime.js";

dotenv.config();

await mongoose.connect(
  process.env.MONGO_URI
);

await Showtime.deleteMany();

console.log(
  "All showtimes deleted ✅"
);

process.exit();
