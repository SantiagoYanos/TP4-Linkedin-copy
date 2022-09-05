import service from "../../services/countries";

const getAllCountries = async (req, res) => {
  const countries = await service.getAllCountries();

  if (countries) {
    res.status(200).json(countries);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener las Countries de la base de datos" });
  }
};

const getOneCountry = async (req, res) => {
  const country = await service.getOneCountry(req.params.id);

  if (country) {
    res.status(200).json(country);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener una Country de la base de datos" });
  }
};

const createCountry = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newCountry = {
    ...req.body,
  };

  const createdCountry = await service.createCountry(newCountry);

  if (createdCountry) {
    res.status(200).json(createdCountry);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al crear una country en la base de datos" });
  }
};

const updateCountry = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ message: "Please provide all required fields" });
  } else {
    const editedCountry = service.updateCountry(req.body.id, req.body);

    if (editedCountry) {
      res.status(200).json(editedCountry);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al editar una country de la base de datos" });
    }
  }
};

export default {
  getAllCountries,
  getOneCountry,
  createCountry,
  updateCountry,
};
