import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import showtimeRoutes from "./routes/showtimeRoutes.js";
import theatreRoutes from "./routes/theatreRoutes.js";

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MovieMatrix API Running 🎬");
});

app.use(
  "/api/theatres",
   theatreRoutes
  );
app.use(
  "/api/showtimes", 
  showtimeRoutes
  );
app.use(
  "/api/seats",
  seatRoutes
);

app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});