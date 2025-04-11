import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../services/api";
import "../styles/BookCar.css";


const BookCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await API.get(`/cars/${id}`);
        console.log("Car API Response:", res.data);
        setCar(res.data); // Use res.data directly
      } catch (error) {
        console.error("Error fetching car:", error);
        alert("Error fetching car");
      }
    };
    fetchCar();
  }, [id]);
  
  
  const handleBooking = async () => {
    if (!startDate || !endDate) return alert("Please select both dates.");
  
    const token = localStorage.getItem("token");
  
    const dayDifference = Math.max(
        1,
        Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
      );
      
    const totalPrice = dayDifference * car.price;
  
    try {
      const res = await API.post("/bookings", {
        carId: id,
        startDate,
        endDate,
        totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  console.log(res);
      if (res.data && res.data._id) {
        navigate(`/booking-summary/${res.data._id}`);
      } else {
        alert("Booking successful, but no booking ID returned.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    }
  };
  
  
  if (!car) return <p>Loading car details...</p>;

  return (
    <div className="book-car">
      <h2>Book {car.name}</h2>
      <p>Brand: {car.brand}</p>
      <p>Fuel: {car.fuelType}</p>
      <p>Price: ₹{car.price} / day</p>

      <div>
  <label>Start Date: </label>
  <DatePicker selected={startDate} onChange={setStartDate} />
</div>

<div>
  <label>End Date: </label>
  <DatePicker selected={endDate} onChange={setEndDate} />
</div>

{/* Show selected date range */}
{startDate && endDate && (
  <p style={{ marginTop: "10px" }}>
    Booking from <strong>{startDate.toDateString()}</strong> to{" "}
    <strong>{endDate.toDateString()}</strong>
  </p>
)}

<button onClick={handleBooking}>Confirm Booking</button>

    </div>
  );
};

export default BookCar;
