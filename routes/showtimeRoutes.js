import express from "express";
import Showtime from "../models/ShowTime.js";
import Theatre from "../models/Theatre.js";

const router = express.Router();

/* =====================================================
   GET SHOWTIMES BY MOVIE + CITY
===================================================== */

router.get(
  "/:movieId/:city",
  async (req, res) => {
    const { movieId, city } =
      req.params;

    try {
      /* ----------------------------------------
         GET THEATRES BY CITY ONLY
      ---------------------------------------- */

      const theatres =
        await Theatre.find({
          location: city,
        });

      /* ----------------------------------------
         EXISTING SHOWTIMES
      ---------------------------------------- */

      const existing =
        await Showtime.find({
          movieId,
        });

      const existingTheatreIds =
        existing.map((s) =>
          s.theatre.toString()
        );

      /* ----------------------------------------
         FIND MISSING THEATRES
      ---------------------------------------- */

      const missing =
        theatres.filter(
          (t) =>
            !existingTheatreIds.includes(
              t._id.toString()
            )
        );

      /* ----------------------------------------
         SEED ONLY MISSING
      ---------------------------------------- */

      if (missing.length) {
        console.log(
          "Seeding missing theatres…"
        );

        const newShows =
          missing.map((t) => ({
            movieId,
            theatre: t._id,
            timings: [
              "10:00 AM",
              "1:30 PM",
              "4:30 PM",
              "7:30 PM",
            ],
            price: 250, // default price
          }));

        await Showtime.insertMany(
          newShows
        );
      }

      /* ----------------------------------------
         FETCH FINAL DATA
      ---------------------------------------- */

      const shows =
        await Showtime.find({
          movieId,
        }).populate("theatre");

      /* FILTER BY CITY SAFELY */

      const filtered =
        shows.filter(
          (s) =>
            s.theatre?.location ===
            city
        );

      res.json(filtered);
    } catch (err) {
      console.error(
        "Showtime route error:",
        err
      );

      res.status(500).json({
        message:
          "Error fetching showtimes",
      });
    }
  }
);

export default router;
