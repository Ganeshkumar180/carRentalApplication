import { useEffect, useState } from "react";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log("Stored user in localStorage:", localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    console.log("🪪 Access Token:", localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/bookings/my"); // ✅ token auto-attached by interceptor
        setBookings(res.data);
      } catch (err) {
        console.error("Fetch bookings failed:", err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (loading) return <p className="loading">Loading bookings...</p>;

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
  <p>You have no valid bookings, or the cars might have been removed by admin.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              {booking.car ? (
                <>
                  <img src={booking.car.image} alt={booking.car.name} />
                  <div>
                    <h3>{booking.car.name}</h3>
                    <p>
                      <strong>From:</strong>{" "}
                      {new Date(booking.fromDate).toDateString()}
                    </p>
                    <p>
                      <strong>To:</strong>{" "}
                      {new Date(booking.toDate).toDateString()}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{booking.totalPrice}
                    </p>
                  </div>
                </>
              ) : (
                <div className="missing-car">
                  <p>⚠️ Car details not available (might be deleted).</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
