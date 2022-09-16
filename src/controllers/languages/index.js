import service from "../../services/languages/index.js";

const getAllLanguages = async (req, res) => {
  const languages = await service.getAllLanguages();

  if (languages) {
    return res
      .status(200)
      .json({ message: "Languages obtained successfully!", data: languages });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Languages from the database" });
  }

  return languages;
};

const getOneLanguage = async (req, res) => {
  const language = await service.getOneLanguage(Number(req.params.id));

  if (language) {
    return res
      .status(200)
      .json({ message: "Language obtained successfully!", data: language });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining a Language from the database" });
  }

  return language;
};

const createLanguage = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Please provide all required languages" });
  } else {
    const newLanguage = {
      name,
    };

    const language = await service.createLanguage(newLanguage);

    if (language) {
      return res
        .status(200)
        .json({ message: "Lenguage created successfully!", data: language });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Creating a Lenguage in the database" });
    }
  }
};

const updateLanguage = async (req, res) => {
  const { name } = req.body;

  const newData = {
    name,
  };

  const language = await service.updateLanguage(req.body.id, newData);

  if (language) {
    return res
      .status(200)
      .json({ message: "Language edited successfully!", data: language });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a language in the database" });
  }
};

export default {
  getAllLanguages,
  getOneLanguage,
  createLanguage,
  updateLanguage,
};
