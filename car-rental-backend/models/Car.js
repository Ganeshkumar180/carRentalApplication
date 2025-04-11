import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: String,
  fuelType: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  description: String,
}, { timestamps: true });

const Car = mongoose.model("Car", carSchema);
export default Car;
