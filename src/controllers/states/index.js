import service from "../../services/states/index.js";

const getAllStates = async (req, res) => {
  const states = await service.getAllStates();

  if (states) {
    res.status(200).json(states);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener los States de la base de datos" });
  }
};

const getOneState = async (req, res) => {
  const state = await service.getOneState(Number(req.params.id));

  if (state) {
    res.status(200).json(state);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener un State de la base de datos" });
  }
};

const createState = async (req, res) => {
  if (!req.body.country_id || !req.body.name) {
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newState = {
    ...req.body,
    country_id: Number(req.body.country_id),
  };

  const createdState = await service.createState(newState);

  if (createdState) {
    res.status(200).json(createdState);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al crear una state en la base de datos" });
  }
};

const updateState = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ message: "Please provide all required fields" });
  } else {
    const editedState = service.updateState(req.body.id, req.body);

    if (editedState) {
      res.status(200).json(editedState);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al editar una state de la base de datos" });
    }
  }
};

export default {
  getAllStates,
  getOneState,
  createState,
  updateState,
};
