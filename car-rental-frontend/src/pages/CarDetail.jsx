import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "../styles/CarDetail.css";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/cars/${id}`);
        setCar(res.data);
      } catch (error) {
        toast.error("Failed to fetch car details");
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    if (car && startDate && endDate) {
        const diffInDays = Math.max(1, Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
          ));
          
      setTotalPrice(diffInDays * car.price);
    }
  }, [startDate, endDate, car]);

  const handleBooking = async () => {
    if (!user) return toast.error("Please login first");
    if (!startDate || !endDate) return toast.error("Select booking dates");

    navigate("/booking-summary", {
      state: {
        car,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalPrice,
      },
    });
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="car-detail-container">
      <h2>{car.name}</h2>
      <img src={car.image} alt={car.name} className="car-image" />
      <p><strong>Brand:</strong> {car.brand}</p>
      <p><strong>Fuel Type:</strong> {car.fuelType}</p>
      <p><strong>Price/Day:</strong> ₹{car.price}</p>

      <div className="date-picker">
        <label>Start Date:</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} />
      </div>
      <div className="date-picker">
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} minDate={startDate || new Date()} />
      </div>

      {totalPrice > 0 && (
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
      )}

      {user.role!=="admin"&&<button onClick={handleBooking}>Book Now</button>}
    </div>
  );
};

export default CarDetail;
