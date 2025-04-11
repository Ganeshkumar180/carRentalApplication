import API from "./api";

export const getCars = (params) => API.get("/api/cars", { params });
export const getCarById = (id) => API.get(`/api/cars/${id}`);
export const addCar = (data) => API.post("/api/cars", data);
export const updateCar = (id, data) => API.put(`/api/cars/${id}`, data);
export const deleteCar = (id) => API.delete(`/api/cars/${id}`);
