import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../services/api";
import "../styles/BookingSummary.css";
import { toast } from "react-toastify";

const BookingSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id: bookingId } = useParams();
  const { user } = useAuth();
  const [bookingData, setBookingData] = useState(state || null);
  const [loading, setLoading] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      toast.info("Please log in to view this page.");
      navigate("/login");
    }
  }, [user, navigate]);
  console.log("User in BookingSummary:", user);

  // Fetch booking from backend only if needed
  useEffect(() => {
    

    const fetchBooking = async () => {
      if ((!bookingData || !bookingData._id) && bookingId) {
        try {
          const response = await axios.get(`/bookings/${bookingId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });
          
          setBookingData(response.data);
        } catch (err) {
          console.error("❌ Booking fetch failed:", err);
          toast.error("Booking not found.");
          navigate("/cars");
        }
      }
    };
    fetchBooking();
  }, [bookingId, bookingData, navigate,user]);

  // Confirm booking only if it hasn't been confirmed yet
  const handleConfirm = async () => {
    if (loading || bookingId) return;
    setLoading(true);
    try {
      const response = await axios.post("/bookings", {
        userId: user._id,
        carId: bookingData.car._id,
        startDate: bookingData.fromDate,
        endDate: bookingData.toDate,
        totalPrice: bookingData.totalPrice,
      });
      const booking = response.data;
      toast.success("Booking confirmed!");
      navigate(`/booking-summary/${booking._id}`, {
        state: booking,
      });
    } catch (err) {
      console.error("❌ Booking confirmation failed:", err);
      toast.error("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !bookingData) {
    return <p>Loading booking summary...</p>;
  }

  const { car, fromDate, toDate, totalPrice } = bookingData;

  if (!car) {
    return <p>Invalid booking details. Please go back.</p>;
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="booking-summary-container">
      <h2>Booking Summary</h2>
      <h3>{car.name}</h3>
      <p><strong>Brand:</strong> {car.brand}</p>
      <p><strong>Fuel Type:</strong> {car.fuelType}</p>
      <p><strong>Price per day:</strong> ₹{car.price}</p>
      <p><strong>Start Date:</strong> {formatDate(fromDate)}</p>
      <p><strong>End Date:</strong> {formatDate(toDate)}</p>
      <p><strong>Total Price:</strong> ₹{totalPrice}</p>

      {bookingId ? (
        <p className="confirmed-msg">✅ Booking is already confirmed.</p>
      ) : (
        <button onClick={handleConfirm} disabled={loading}>
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      )}

      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>
    </div>
  );
};

export default BookingSummary;
