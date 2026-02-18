import dotenv from "dotenv";
import mongoose from "mongoose";
import Theatre from "../models/Theatre.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB Connected…");

/* RESET */
await Theatre.deleteMany();

/* DATA */

const theatres = [

  /* BANGALORE */
  {
    _id: "698b2158079f75575ffa2479",
    name: "PVR Orion Mall",
    city: "Bangalore",
    location: "Rajajinagar",
    screens: 6,
  },

  {
    _id: "698b2158079f75575ffa247a",
    name: "INOX Garuda Mall",
    city: "Bangalore",
    location: "Magrath Road",
    screens: 5,
  },

  /* HYDERABAD */
  {
    _id: "698b2158079f75575ffa247b",
    name: "AMB Cinemas",
    city: "Hyderabad",
    location: "Gachibowli",
    screens: 7,
  },

  /* CHENNAI */
  {
    _id: "698b2158079f75575ffa247c",
    name: "PVR VR Chennai",
    city: "Chennai",
    location: "Anna Nagar",
    screens: 6,
  },

  /* DELHI */
  {
    _id: "698b102e5f8767add3939039",
    name: "PVR Select City Walk",
    city: "Delhi",
    location: "Saket",
    screens: 5,
  },

  {
    _id: "698b2158079f75575ffa2475",
    name: "INOX Nehru Place",
    city: "Delhi",
    location: "Nehru Place",
    screens: 4,
  },

  /* MUMBAI */
  {
    _id: "698b102e5f8767add3939037",
    name: "PVR Phoenix Marketcity",
    city: "Mumbai",
    location: "Kurla",
    screens: 6,
  },
];

await Theatre.insertMany(theatres);

console.log("✅ Theatres Seeded");

process.exit();
