import service from "../../services/countries/index.js";

const getAllCountries = async (req, res) => {
  const countries = await service.getAllCountries();

  if (countries) {
    return res
      .status(200)
      .json({ message: "Countries obtained successfully!", data: countries });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Countries from the database" });
  }
};

const getOneCountry = async (req, res) => {
  const country = await service.getOneCountry(Number(req.params.id));

  if (country) {
    return res
      .status(200)
      .json({ message: "Country obtained successfully!", data: country });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining a Country from the database" });
  }
};

const createCountry = async (req, res) => {
  const { name, code } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const newCountry = {
    name,
    code,
  };

  const createdCountry = await service.createCountry(newCountry);

  if (createdCountry) {
    return res.status(200).json({
      message: "Country created successfully!!",
      data: createdCountry,
    });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Creating a Country in the database" });
  }
};

const updateCountry = async (req, res) => {
  const { name, code } = req.body;

  if (!req.body.id) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  } else {
    const newData = {
      name,
      code,
    };

    const editedCountry = service.updateCountry(req.body.id, newData);

    if (editedCountry) {
      return res
        .status(200)
        .json({ message: "Country edited successfully!", data: editedCountry });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Editing a Country in the database" });
    }
  }
};

export default {
  getAllCountries,
  getOneCountry,
  createCountry,
  updateCountry,
};
