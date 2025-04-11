import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import BookingSummary from "./pages/BookingSummary";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AddEditCar from "./pages/AddEditCar";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import BookCar from "./pages/BookCar";


function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
      <Route
  path="/book/:id"
  element={
    <ProtectedRoute>
      <BookCar />
    </ProtectedRoute>
  }
/>      
  <Route path="/" element={<Home />} />
  <Route path="/cars" element={<CarList />} />
  <Route path="/cars/:id" element={<CarDetail />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected Routes */}
  <Route
    path="/booking-summary/:id"
    element={<ProtectedRoute><BookingSummary /></ProtectedRoute>}
  />
  <Route
    path="/my-bookings"
    element={<ProtectedRoute><MyBookings /></ProtectedRoute>}
  />
  <Route
    path="/admin"
    element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>}
  />
  <Route
    path="/admin/add-car"
    element={<ProtectedRoute adminOnly={true}><AddEditCar /></ProtectedRoute>}
  />
  <Route
    path="/admin/edit-car/:id"
    element={<ProtectedRoute adminOnly={true}><AddEditCar /></ProtectedRoute>}
  />
</Routes>

    </>
  );
}

export default App;
