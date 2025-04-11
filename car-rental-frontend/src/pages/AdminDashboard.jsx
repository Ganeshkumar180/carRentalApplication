import { useEffect, useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carRes, bookingRes] = await Promise.all([
          axios.get("/cars"),
          axios.get("/bookings"),
        ]);

        console.log("carRes.data ➤", carRes.data); // Debug log

        const carsData = Array.isArray(carRes.data)
          ? carRes.data
          : carRes.data.cars || [];

        const bookingsData = Array.isArray(bookingRes.data)
          ? bookingRes.data
          : bookingRes.data.bookings || [];

        setCars(carsData);
        setBookings(bookingsData);
      } catch (err) {
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
      toast.success("Car deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="loading">Loading admin dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section className="dashboard-section">
        <div className="section-header">
          <h3>Car Listings</h3>
          <button onClick={() => navigate("/admin/add-car")}>Add New Car</button>
        </div>
        {cars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Fuel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={car?._id || index}>
                  <td>
                    {car?.image ? (
                      <img src={car.image} alt={car.name || "Car"} />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{car?.name || "Unnamed Car"}</td>
                  <td>{car?.brand || "N/A"}</td>
                  <td>₹{car?.price ?? "N/A"}</td>
                  <td>{car?.fuelType || "N/A"}</td>
                  <td>
                    <button onClick={() => navigate(`/admin/edit-car/${car?._id}`)}>Edit</button>
                    <button className="danger" onClick={() => handleDelete(car?._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="dashboard-section">
        <h3>All Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Car</th>
                <th>From</th>
                <th>To</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.user?.name || "Unknown User"}</td>
                  <td>{b.car?.name || "Unknown Car"}</td>
                  <td>{new Date(b.fromDate).toDateString()}</td>
                  <td>{new Date(b.toDate).toDateString()}</td>
                  <td>₹{b.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
