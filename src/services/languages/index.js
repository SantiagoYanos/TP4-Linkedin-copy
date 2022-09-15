import Language from "../../models/Language.js";

const getAllLanguages = () => {
  const languages = Language.getAllLanguages();

  return languages;
};

const getOneLanguage = () => {
  const language = Language.getOneLanguage(id);

  return language;
};

const createLanguage = (data) => {
  const language = Language.createLanguage(data);

  return language;
};

const updateLanguage = (id, data) => {
  const language = Language.updateLanguage(id, data);

  return language;
};

export default {
  getAllLanguages,
  getOneLanguage,
  createLanguage,
  updateLanguage,
};
