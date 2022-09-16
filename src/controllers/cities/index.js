import service from "../../services/cities/index.js";

const getAllCities = async (req, res) => {
  const cities = await service.getAllCities();

  if (cities) {
    return res
      .status(200)
      .json({ message: "Cities obtained successfully!", data: cities });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Cities from the database" });
  }
};

const getOneCity = async (req, res) => {
  const city = await service.getOneCity(Number(req.params.id));

  if (city) {
    return res
      .status(200)
      .json({ message: "City obtained successfully!", data: city });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining a City from the database" });
  }
};

const createCity = async (req, res) => {
  if (!req.body.state_id || !req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const newCity = {
    name: req.body.name,
    code: req.body.code,
    state_id: req.body.state_id,
  };

  const createdCity = await service.createCity(newCity);

  if (createdCity) {
    return res
      .status(200)
      .json({ message: "City created successfully!", data: createdCity });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Creating a City in the database" });
  }
};

const updateCity = async (req, res) => {
  if (!req.body.id) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  } else {
    const newData = {
      name: req.body.name,
      code: req.body.code,
      state_id: req.body.state_id,
    };

    const editedCity = service.updateCity(req.body.id, newData);

    if (editedCity) {
      return res
        .status(200)
        .json({ message: "City edited successfully", data: editedCity });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Editing Cities in the database" });
    }
  }
};

export default {
  getAllCities,
  getOneCity,
  createCity,
  updateCity,
};
