import { useEffect, useState } from "react";
import API from "../services/api";
import CarCard from "../components/CarCard";
import "../styles/Cars.css";
import { useAuth } from "../context/AuthContext";

const CarList = () => {
  const {user}=useAuth();
  const [cars, setCars] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      const res = await API.get("/cars");
      const carList = Array.isArray(res.data.cars) ? res.data.cars : [];
      setCars(carList);
      setFiltered(carList);
    };
    fetchCars();
  }, []);
  

  useEffect(() => {
    let data = [...cars];
    if (search) data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    if (brand) data = data.filter(c => c.brand === brand);
    if (fuelType) data = data.filter(c => c.fuelType === fuelType);
    if (maxPrice) data = data.filter(c => c.price <= maxPrice);
    setFiltered(data);
    setPage(1); // reset to page 1 on filter change
  }, [search, brand, fuelType, maxPrice]);

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="cars-page">
      <h2>Available Cars</h2>

      <div className="filters">
        <input placeholder="Search by name" onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setBrand(e.target.value)} defaultValue="">
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="BMW">BMW</option>
          <option value="Honda">Honda</option>
        </select>
        <select onChange={(e) => setFuelType(e.target.value)} defaultValue="">
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
        <input type="number" placeholder="Max Price" onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      <div className="car-list">
        {paginated.length > 0 ? (
          paginated.map((car) => <CarCard key={car._id} car={car} isAdmin={user.role==="admin"} />)
        ) : (
          <p>No cars match your filter.</p>
        )}
      </div>

      <div className="pagination">
        {[...Array(totalPages).keys()].map(i => (
          <button key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarList;
