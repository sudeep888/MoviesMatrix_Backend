import dotenv from "dotenv";
import mongoose from "mongoose";
import Showtime from "../models/ShowTime.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB Connected…");

/* RESET */
await Showtime.deleteMany();

/* USE ANY TMDB MOVIE ID YOU OPEN */
const MOVIE_ID = 840464;

const showtimes = [

  /* BANGALORE */

  {
    movieId: MOVIE_ID,
    theatre: "698b2158079f75575ffa2479",
    timings: [
      "10:00 AM",
      "1:30 PM",
      "4:30 PM",
      "7:30 PM",
    ],
    price: 250,
  },

  {
    movieId: MOVIE_ID,
    theatre: "698b2158079f75575ffa247a",
    timings: [
      "9:45 AM",
      "12:45 PM",
      "3:45 PM",
      "6:45 PM",
    ],
    price: 260,
  },

  /* MUMBAI */

  {
    movieId: MOVIE_ID,
    theatre: "698b102e5f8767add3939037",
    timings: [
      "10:30 AM",
      "2:30 PM",
      "7:00 PM",
    ],
    price: 300,
  },

  /* DELHI */

  {
    movieId: MOVIE_ID,
    theatre: "698b102e5f8767add3939039",
    timings: [
      "11:00 AM",
      "2:45 PM",
      "6:30 PM",
    ],
    price: 280,
  },

  {
    movieId: MOVIE_ID,
    theatre: "698b2158079f75575ffa2475",
    timings: [
      "10:15 AM",
      "1:15 PM",
      "4:15 PM",
    ],
    price: 270,
  },

  /* HYDERABAD */

  {
    movieId: MOVIE_ID,
    theatre: "698b2158079f75575ffa247b",
    timings: [
      "10:00 AM",
      "1:30 PM",
      "7:30 PM",
    ],
    price: 240,
  },

  /* CHENNAI */

  {
    movieId: MOVIE_ID,
    theatre: "698b2158079f75575ffa247c",
    timings: [
      "10:00 AM",
      "1:30 PM",
      "4:30 PM",
    ],
    price: 230,
  },
];

await Showtime.insertMany(showtimes);

console.log("✅ Showtimes Seeded");

process.exit();
