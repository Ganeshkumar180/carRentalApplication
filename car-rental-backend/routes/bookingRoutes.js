import express from "express";
import {
  bookCar,
  getMyBookings,
  getAllBookings,
  getBookingById
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js"; // ✅ ADD THIS

const router = express.Router();

router.get("/my", protect, getMyBookings);
router.get("/:id", protect, getBookingById);
router.get("/", protect, admin, getAllBookings);
router.post("/", protect, bookCar);



export default router;
