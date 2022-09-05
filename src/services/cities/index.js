import City from "../../models/City.js";

const getAllCities = () => {
  const cities = City.getAllCities();

  return cities;
};

const getOneCity = (id) => {
  const city = City.getOneCity(id);

  return city;
};

const createCity = (data) => {
  const city = City.createCity(data);

  return city;
};

const updateCity = (id, data) => {
  const city = City.updateCity(id, data);

  return city;
};

export default {
  getAllCities,
  getOneCity,
  createCity,
  updateCity,
};
