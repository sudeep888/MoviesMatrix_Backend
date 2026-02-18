import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },

    seatNumber: String, // A1, B4

    category: String, // Platinum / Gold / Silver

    price: Number,

    isBooked: {
      type: Boolean,
      default: false,
    },

    isLocked: {
      type: Boolean,
      default: false,
    },

    lockedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Seat",
  seatSchema
);
