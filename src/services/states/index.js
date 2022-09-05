import State from "../../models/State.js";

const getAllStates = () => {
  const states = State.getAllStates();

  return states;
};

const getOneState = (id) => {
  const state = State.getOneState(id);

  return state;
};

const createState = (data) => {
  const state = State.createState(data);

  return state;
};

const updateState = (id, data) => {
  const state = State.updateState(id, data);

  return state;
};

export default {
  getAllStates,
  getOneState,
  createState,
  updateState,
};
