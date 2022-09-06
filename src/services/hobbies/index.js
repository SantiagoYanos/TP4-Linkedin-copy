import Hobby from "../../models/Hobbies.js";

const getAllHobbies = () => {
  const hobbies = Hobby.getAllHobbies();

  return hobbies;
};

const getOneHobby = () => {
  const hobby = Hobby.getOneHobby(id);

  return hobby;
};

const createHobby = (data) => {
  const hobby = Hobby.createHobby(data);

  return hobby;
};

const updateHobby = (id, data) => {
  const hobby = Hobby.updateHobby(id, data);

  return hobby;
};

export default {
  getAllHobbies,
  getOneHobby,
  createHobby,
  updateHobby,
};
