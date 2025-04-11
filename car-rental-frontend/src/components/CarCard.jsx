import { Link } from "react-router-dom";

const CarCard = ({ car, isAdmin = false }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>Brand: {car.brand}</p>
      <p>Fuel: {car.fuelType}</p>
      <p>Price: ₹{car.price} / day</p>
      {!isAdmin&&<Link to={`/book/${car._id}`} className="book-btn">Book Now</Link>}

    </div>
  );
};

export default CarCard;
