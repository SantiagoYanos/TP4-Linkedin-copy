import service from "../../services/lenguages/index.js";

const getAllLenguages = async (req, res) => {
  const lenguages = await service.getAllLenguages();

  if (lenguages) {
    res.status(200).json(lenguages);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener Lenguages de la base de datos" });
  }

  return lenguage;
};

const getOneLenguage = async (req, res) => {
  const lenguage = await service.getOneLenguage(Number(req.params.id));

  if (lenguage) {
    res.status(200).json(lenguage);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener la Lenguage de la base de datos" });
  }

  return lenguage;
};

const createLenguage = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide all required lenguages" });
  } else {
    const newLenguage = {
      ...req.body,
    };

    const lenguage = await service.createLenguage(newLenguage);

    if (lenguage) {
      res.status(200).json(lenguage);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al crear una Lenguage en la base de datos" });
    }
  }
};

const updateLenguage = async (req, res) => {
  const lenguage = await service.updateLenguage(req.body.id, req.body);

  if (lenguage) {
    res.status(200).json(lenguage);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al editar una Lenguage en la base de datos" });
  }
};

export default {
  getAllLenguages,
  getOneLenguage,
  createLenguage,
  updateLenguage,
};
