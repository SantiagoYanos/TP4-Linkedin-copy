import service from "../../services/cities/index.js";

const getAllCities = async (req, res) => {
  const cities = await service.getAllCities();

  if (cities) {
    res.status(200).json(cities);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener las Cities de la base de datos" });
  }
};

const getOneCity = async (req, res) => {
  const city = await service.getOneCity(Number(req.params.id));

  if (city) {
    res.status(200).json(city);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener una City de la base de datos" });
  }
};

const createCity = async (req, res) => {
  if (!req.body.state_id || !req.body.name) {
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newCity = {
    ...req.body,
  };

  const createdCity = await service.createCity(newCity);

  if (createdCity) {
    res.status(200).json(createdCity);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al crear una city en la base de datos" });
  }
};

const updateCity = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ message: "Please provide all required fields" });
  } else {
    const editedCity = service.updateCity(req.body.id, req.body);

    if (editedCity) {
      res.status(200).json(editedCity);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al editar una city de la base de datos" });
    }
  }
};

export default {
  getAllCities,
  getOneCity,
  createCity,
  updateCity,
};
