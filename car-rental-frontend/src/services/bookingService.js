import API from "./api";

export const bookCar = (data) => API.post("/bookings", data);
export const getMyBookings = () => API.get("/bookings/my");
export const getAllBookings = () => API.get("/bookings/all");
