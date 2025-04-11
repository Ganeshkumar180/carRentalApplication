import Car from "../models/Car.js";

// @desc Get all cars (with optional filters)
export const getCars = async (req, res) => {
  try {
    const { brand, fuelType, search, page = 1, limit = 6 } = req.query;

    const query = {};

    if (brand) query.brand = brand;
    if (fuelType) query.fuelType = fuelType;
    if (search) query.name = { $regex: search, $options: "i" };

    const total = await Car.countDocuments(query);
    const cars = await Car.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ cars, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get single car
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Add car (admin)
export const addCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ message: "Failed to add car" });
  }
};

// @desc Edit car (admin)
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: "Failed to update car" });
  }
};

// @desc Delete car (admin)
export const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete car" });
  }
};

