import Field from "../../models/Field.js";

const getAllFields = () => {
  const fields = Field.getAllFields();

  return fields;
};

const getOneField = () => {
  const field = Field.getOneField(id);

  return field;
};

const createField = (data) => {
  const field = Field.createField(data);

  return field;
};

const updateField = (id, data) => {
  const field = Field.updateField(id, data);

  return field;
};

export default {
  getAllFields,
  getOneField,
  createField,
  updateField,
};
