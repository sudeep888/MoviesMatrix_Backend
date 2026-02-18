import express from "express";
import Showtime from "../models/ShowTime.js";
import Theatre from "../models/Theatre.js";

const router = express.Router();

/* ============================================================
   🎬 GET SHOWTIMES BY MOVIE + CITY  (DYNAMIC SEEDING)
   Route → /api/showtimes/:movieId/:city
============================================================ */

router.get("/:movieId/:city", async (req, res) => {
  const { movieId, city } = req.params;

  try {
    /* ------------------------------------------------
       1️⃣ GET ALL THEATRES IN SELECTED CITY
       (Matches your Atlas DB structure)
    ------------------------------------------------ */

    const theatres = await Theatre.find({
      city: city, // ✅ correct field (NOT location)
    });

    if (!theatres.length) {
      return res.json([]); // No theatres → no shows
    }

    /* ------------------------------------------------
       2️⃣ FIND EXISTING SHOWTIMES FOR MOVIE
    ------------------------------------------------ */

    const existingShows = await Showtime.find({
      movieId: movieId,
    });

    const existingTheatreIds =
      existingShows.map((show) =>
        show.theatre.toString()
      );

    /* ------------------------------------------------
       3️⃣ FIND THEATRES WITHOUT SHOWTIMES
    ------------------------------------------------ */

    const missingTheatres =
      theatres.filter(
        (theatre) =>
          !existingTheatreIds.includes(
            theatre._id.toString()
          )
      );

    /* ------------------------------------------------
       4️⃣ DYNAMICALLY SEED SHOWTIMES
       (Only if missing)
    ------------------------------------------------ */

    if (missingTheatres.length) {
      console.log(
        "🎬 Seeding showtimes dynamically..."
      );

      const newShows =
        missingTheatres.map((t) => ({
          movieId: movieId,
          theatre: t._id,

          timings: [
            "10:00 AM",
            "1:30 PM",
            "4:30 PM",
            "7:30 PM",
          ],

          /* Dynamic pricing by city */
          price:
            t.city === "Mumbai"
              ? 350
              : t.city === "Delhi"
              ? 300
              : 250,
        }));

      await Showtime.insertMany(
        newShows
      );
    }

    /* ------------------------------------------------
       5️⃣ FETCH FINAL POPULATED DATA
    ------------------------------------------------ */

    const shows =
      await Showtime.find({
        movieId: movieId,
      }).populate("theatre");

    /* ------------------------------------------------
       6️⃣ FILTER BY CITY (Safety Filter)
    ------------------------------------------------ */

    const filteredShows =
      shows.filter(
        (show) =>
          show.theatre?.city === city
      );

    /* ------------------------------------------------
       7️⃣ RETURN RESPONSE
    ------------------------------------------------ */

    res.json(filteredShows);
  } catch (error) {
    console.error(
      "❌ Showtime Route Error:",
      error
    );

    res.status(500).json({
      message:
        "Error fetching showtimes",
    });
  }
});

/* ============================================================
   ➕ ADD SHOWTIME (ADMIN / FUTURE USE)
============================================================ */

router.post("/", async (req, res) => {
  try {
    const showtime =
      await Showtime.create(req.body);

    res.status(201).json(showtime);
  } catch (error) {
    res.status(500).json({
      message:
        "Error adding showtime",
    });
  }
});

/* ============================================================
   🎭 GET SHOWTIMES BY THEATRE
============================================================ */

router.get(
  "/theatre/:theatreId",
  async (req, res) => {
    try {
      const shows =
        await Showtime.find({
          theatre:
            req.params.theatreId,
        });

      res.json(shows);
    } catch (error) {
      res.status(500).json({
        message:
          "Error fetching theatre shows",
      });
    }
  }
);

export default router;
