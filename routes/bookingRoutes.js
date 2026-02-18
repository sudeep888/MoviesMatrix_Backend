import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* ---------------- CREATE BOOKING ---------------- */

router.post("/", async (req, res) => {
  try {
    const booking =
      await Booking.create(req.body);

    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- GET USER BOOKINGS ---------------- */

router.get("/:userId", async (req, res) => {
  try {
    const bookings =
      await Booking.find({
        userId: req.params.userId,
      }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- DELETE BOOKING ---------------- */

router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Booking Cancelled",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
