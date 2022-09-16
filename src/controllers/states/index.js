import service from "../../services/states/index.js";

const getAllStates = async (req, res) => {
  const states = await service.getAllStates();

  if (states) {
    return res
      .status(200)
      .json({ message: "States obtained successfully!", data: states });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining States from the database" });
  }
};

const getOneState = async (req, res) => {
  const state = await service.getOneState(Number(req.params.id));

  if (state) {
    return res
      .status(200)
      .json({ message: "State obtained successfully!", data: state });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining a State from the database" });
  }
};

const createState = async (req, res) => {
  const { name, code, country_id } = req.body;

  if (!country_id || !name) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const newState = {
    name,
    code,
    country_id: Number(country_id),
  };

  const createdState = await service.createState(newState);

  if (createdState) {
    return res
      .status(200)
      .json({ message: "State created successfully!", data: createdState });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Creating a State in the database" });
  }
};

const updateState = async (req, res) => {
  const { name, code, country_id } = req.body;

  if (!req.body.id) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  } else {
    const newData = {
      name,
      code,
      country_id: Number(country_id),
    };

    const editedState = service.updateState(req.body.id, newData);

    if (editedState) {
      return res
        .status(200)
        .json({ message: "State edited successfully!", data: editedState });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Editing a State in the database" });
    }
  }
};

export default {
  getAllStates,
  getOneState,
  createState,
  updateState,
};
