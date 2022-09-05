import Country from "../../models/Country.js";

const getAllCountries = () => {
  const countrys = Country.getAllCountries();

  return countrys;
};

const getOneCountry = (id) => {
  const country = Country.getOneCountry(id);

  return country;
};

const createCountry = (data) => {
  const country = Country.createCountry(data);

  return country;
};

const updateCountry = (id, data) => {
  const country = Country.updateCountry(id, data);

  return country;
};

export default {
  getAllCountries,
  getOneCountry,
  createCountry,
  updateCountry,
};
