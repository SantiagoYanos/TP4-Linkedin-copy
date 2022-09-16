import service from "../../services/field_types/index.js";

const getAllField_types = async (req, res) => {
  const field_types = await service.getAllField_types();

  if (field_types) {
    return res.status(200).json({
      message: "Field_types obtained successfully!",
      data: field_types,
    });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Field_types from the database" });
  }

  return field_types;
};

const getOneField_type = async (req, res) => {
  const field_type = await service.getOneField_type(Number(req.params.id));

  if (field_type) {
    return res
      .status(200)
      .json({ message: "Field_type obtained successfully!", data: field_type });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Field_Types in the database" });
  }

  return field_type;
};

const createField_type = async (req, res) => {
  const { name } = req.body;

  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for the Field_type" });
  } else {
    const newField_type = {
      name,
    };

    const field_type = await service.createField_type(newField_type);

    if (field_type) {
      return res.status(200).json({
        message: "Field_type created successfully!",
        data: field_type,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Creating a File_type in the database" });
    }
  }
};

const updateField_type = async (req, res) => {
  const { name } = req.body;

  const newData = {
    name,
  };

  const field_type = await service.updateField_type(req.body.id, name);

  if (field_type) {
    return res
      .status(200)
      .json({ message: "Field_type edited successfully!", data: field_type });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a Field_type in the database" });
  }
};

export default {
  getAllField_types,
  getOneField_type,
  createField_type,
  updateField_type,
};
