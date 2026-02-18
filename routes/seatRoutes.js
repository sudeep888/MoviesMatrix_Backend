import express from "express";
import Seat from "../models/Seat.js";

const router = express.Router();

/* GET SEATS BY SHOWTIME */
router.get("/:showtimeId", async (req, res) => {
  const seats = await Seat.find({
    showtime: req.params.showtimeId,
  });

  res.json(seats);
});

/* LOCK SEATS */
router.post("/lock", async (req, res) => {
  const { seats } = req.body;

  await Seat.updateMany(
    { _id: { $in: seats } },
    {
      isLocked: true,
      lockedAt: new Date(),
    }
  );

  res.json("Seats Locked");
});

/* CONFIRM BOOKING */
router.post("/book", async (req, res) => {
  const { seats } = req.body;

  await Seat.updateMany(
    { _id: { $in: seats } },
    {
      isBooked: true,
      isLocked: false,
    }
  );

  res.json("Seats Booked");
});

export default router;
