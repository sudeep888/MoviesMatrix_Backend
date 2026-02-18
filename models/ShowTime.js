import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema(
  {
    movieId: Number,

    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
    },

    timings: [String],

    price: Number,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Showtime",
  showtimeSchema
);
