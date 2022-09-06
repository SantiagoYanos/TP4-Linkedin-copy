import Field from "../../models/Field";
import service from "../../services/fields/index.js";

const getAllFields = async (req, res) => {
  const fields = await service.getAllFields();

  if (fields) {
    res.status(200).json(fields);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener Fields de la base de datos" });
  }

  return field;
};

const getOneField = async (req, res) => {
  const field = await service.getOneField(req.body.id);

  if (field) {
    res.status(200).json(field);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener la Field de la base de datos" });
  }

  return field;
};

const createField = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide all required fields" });
  } else {
    const newField = {
      ...req.body,
    };

    const field = await service.createField(newField);

    if (field) {
      res.status(200).json(field);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al crear una Field en la base de datos" });
    }
  }
};

const updateField = async (req, res) => {
  const field = await service.updateField(req.body.id, req.body);

  if (field) {
    res.status(200).json(field);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al editar una Field en la base de datos" });
  }
};

export default {
  getAllFields,
  getOneField,
  createField,
  updateField,
};
