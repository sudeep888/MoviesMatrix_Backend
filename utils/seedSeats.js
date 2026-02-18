import dotenv from "dotenv";
import mongoose from "mongoose";

import Seat from "../models/Seat.js";
import Showtime from "../models/ShowTime.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("Seeding Seats...");

/* CATEGORY LOGIC */
const getCategory = (row) => {
  if (row <= 1)
    return { type: "Platinum", price: 400 };

  if (row <= 3)
    return { type: "Gold", price: 300 };

  return { type: "Silver", price: 200 };
};

const rows = 6;
const cols = 8;

/* GET ALL SHOWTIMES */
const showtimes = await Showtime.find();

/* CLEAR OLD */
await Seat.deleteMany();

/* GENERATE */
for (let show of showtimes) {
  const seats = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seatNumber =
        String.fromCharCode(65 + r) +
        (c + 1);

      const { type, price } =
        getCategory(r);

      seats.push({
        showtime: show._id,
        seatNumber,
        category: type,
        price,
      });
    }
  }

  await Seat.insertMany(seats);
}

console.log("Seats Seeded 🎟️");

process.exit();
