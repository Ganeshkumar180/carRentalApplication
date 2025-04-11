import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import mongoose from "mongoose";

// @desc Book a car
export const bookCar = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalPrice } = req.body;

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const newBooking = await Booking.create({
      user: req.user._id,
      car: carId,
      fromDate: startDate,
      toDate: endDate,
      totalPrice,
    });

    const populatedBooking = await Booking.findById(newBooking._id).populate("car");

    res.status(201).json(populatedBooking); // ✅ Return populated booking
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};


// @desc Get current user's bookings
// GET /bookings/my
// @desc Get current user's bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car");

bookings.forEach(b => {
  console.log("🧾 Booking ID:", b._id, " | Car:", b.car ? b.car.name : "❌ Car Deleted");
});


    // ✅ Filter out bookings where car is null or undefined or invalid
    const validBookings = bookings.filter(b => b.car && b.car._id);

    res.json(validBookings);
  } catch (err) {
    console.error("Get My Bookings Error:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};



// @desc Admin: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("car")
      .populate("user", "name email");

    res.json(bookings);
  } catch (err) {
    console.error("Get All Bookings Error:", err);
    res.status(500).json({ message: "Error fetching all bookings" });
  }
};
// bookingController.js


export const getBookingById = async (req, res) => {
  const { id } = req.params;

  console.log("🛠️ Fetching booking with ID:", id); // LOG ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("❌ Invalid MongoDB ObjectId");
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const booking = await Booking.findById(id).populate("car");
    if (!booking) {
      console.log("❌ Booking not found in DB");
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("✅ Booking found:", booking._id);
    res.json(booking);
  } catch (err) {
    console.error("🔥 Error fetching booking:", err);
    res.status(500).json({ message: "Failed to fetch booking" });
  }
};
