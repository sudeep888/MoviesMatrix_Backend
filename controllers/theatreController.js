import Theatre from "../models/Theatre.js";

/* ---------------- ADD THEATRE ---------------- */
export const addTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(
      req.body
    );

    res.status(201).json(theatre);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- GET ALL ---------------- */
export const getAllTheatres = async (
  req,
  res
) => {
  try {
    const theatres =
      await Theatre.find();

    res.json(theatres);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- GEO FILTER ---------------- */
export const getTheatresByCity =
  async (req, res) => {
    try {
      const { city } = req.query;

      const theatres =
        await Theatre.find({
          city,
        });

      res.json(theatres);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
