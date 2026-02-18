import mongoose from "mongoose";

const bookingSchema =
  new mongoose.Schema(
    {
      userId: String,

      movie: String,

      theatre: String,

      seats: [String],

      time: String,

      total: Number,
    },
    { timestamps: true }
  );

export default mongoose.model(
  "Booking",
  bookingSchema
);
