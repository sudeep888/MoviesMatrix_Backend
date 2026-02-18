import Showtime from "../models/ShowTime.js";

/* ---------------- ADD SHOWTIME ---------------- */
export const addShowtime = async (
  req,
  res
) => {
  try {
    const showtime =
      await Showtime.create(req.body);

    res.status(201).json(showtime);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- BY MOVIE ---------------- */
export const getByMovie = async (
  req,
  res
) => {
  try {
    const shows =
      await Showtime.find({
        movieId: req.params.movieId,
      }).populate("theatre");

    res.json(shows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- BY THEATRE ---------------- */
export const getByTheatre =
  async (req, res) => {
    try {
      const shows =
        await Showtime.find({
          theatre: req.params.theatreId,
        });

      res.json(shows);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
