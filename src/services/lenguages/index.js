import Lenguage from "../../models/Lenguage.js";

const getAllLenguages = () => {
  const lenguages = Lenguage.getAllLenguages();

  return lenguages;
};

const getOneLenguage = () => {
  const lenguage = Lenguage.getOneLenguage(id);

  return lenguage;
};

const createLenguage = (data) => {
  const lenguage = Lenguage.createLenguage(data);

  return lenguage;
};

const updateLenguage = (id, data) => {
  const lenguage = Lenguage.updateLenguage(id, data);

  return lenguage;
};

export default {
  getAllLenguages,
  getOneLenguage,
  createLenguage,
  updateLenguage,
};
