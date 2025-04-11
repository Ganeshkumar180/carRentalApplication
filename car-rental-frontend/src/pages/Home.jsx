import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Optional: Create this CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to ZoomDrive Rentals</h1>
        <p>Find your perfect ride and book it in just a few clicks!</p>
        <button onClick={() => navigate("/cars")}>Browse Cars</button>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Wide Selection</h3>
          <p>Choose from a variety of cars, from economy to luxury.</p>
        </div>
        <div className="feature-card">
          <h3>Affordable Pricing</h3>
          <p>Transparent daily rates with no hidden fees.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Book your favorite car in seconds with real-time availability.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
