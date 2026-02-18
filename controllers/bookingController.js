import Booking from "../models/Booking.js";

/* CREATE BOOKING */
export const createBooking =
  async (req, res) => {
    try {
      const booking =
        await Booking.create(req.body);

      res.json(booking);
    } catch (err) {
      res.status(500).json(err);
    }
  };

/* GET USER BOOKINGS */
export const getBookings =
  async (req, res) => {
    try {
      const data =
        await Booking.find({
          userId: req.params.userId,
        }).sort({ createdAt: -1 });

      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };
