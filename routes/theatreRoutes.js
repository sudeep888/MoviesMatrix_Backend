import express from "express";
import Theatre from "../models/Theatre.js";

const router = express.Router();

/* GET theatres by city */
router.get("/:city", async (req, res) => {
  try {
    const theatres = await Theatre.find({
      city: req.params.city,
    });

    res.json(theatres);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch theatres",
    });
  }
});

export default router;
