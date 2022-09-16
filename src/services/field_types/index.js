import Field_type from "../../models/Field_type.js";

const getAllField_types = () => {
  const field_types = Field_type.getAllField_types();

  return field_types;
};

const getOneField_type = () => {
  const field_type = Field_type.getOneField_type(id);

  return field_type;
};

const createField_type = (data) => {
  const field_type = Field_type.createField_type(data);

  return field_type;
};

const updateField_type = (id, data) => {
  const field_type = Field_type.updateField_type(id, data);

  return field_type;
};

export default {
  getAllField_types,
  getOneField_type,
  createField_type,
  updateField_type,
};
