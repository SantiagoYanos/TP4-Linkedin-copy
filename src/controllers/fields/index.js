import service from "../../services/fields/index.js";

const getAllFields = async (req, res) => {
  const fields = await service.getAllFields();

  if (fields) {
    return res
      .status(200)
      .json({ message: "Fields obtained successfully!", data: fields });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Fields from the database" });
  }

  return fields;
};

const getOneField = async (req, res) => {
  const field = await service.getOneField(Number(req.params.id));

  if (field) {
    return res
      .status(200)
      .json({ message: "Field obtained successfully!", data: field });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining a Field from the database" });
  }

  return field;
};

const createField = async (req, res) => {
  const { name, type_id } = req.body;

  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  } else {
    const newField = {
      name,
      type_id,
    };

    const field = await service.createField(newField);

    if (field) {
      return res
        .status(200)
        .json({ message: "Field created successfully!", data: field });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Creating a Field in the database" });
    }
  }
};

const updateField = async (req, res) => {
  const { name, type_id } = req.body;

  const newData = {
    name,
    type_id,
  };

  const field = await service.updateField(req.body.id, newData);

  if (field) {
    return res
      .status(200)
      .json({ message: "Field edited successfully!", data: field });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a Field in the database" });
  }
};

export default {
  getAllFields,
  getOneField,
  createField,
  updateField,
};
