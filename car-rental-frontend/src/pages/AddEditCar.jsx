import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/api";
import { toast } from "react-toastify";
import "../styles/AddEditCar.css";

const AddEditCar = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    fuelType: "",
    image: "",
  });

  const { id } = useParams(); // if id exists, it's edit mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchCar = async () => {
        try {
          const res = await axios.get(`/cars/${id}`);
          setFormData(res.data);
        } catch (err) {
          toast.error("Failed to load car");
        }
      };
      fetchCar();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`/cars/${id}`, formData);
        toast.success("Car updated successfully");
      } else {
        await axios.post("/cars", formData);
        toast.success("Car added successfully");
      }
      navigate("/admin");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add-edit-car">
      <h2>{isEditMode ? "Edit Car" : "Add New Car"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditMode ? "Update" : "Add"} Car</button>
      </form>
    </div>
  );
};

export default AddEditCar;
