import service from "../../services/languages/index.js";

const getAllLanguages = async (req, res) => {
  const languages = await service.getAllLanguages();

  if (languages) {
    res.status(200).json(languages);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener Languages de la base de datos" });
  }

  return languages;
};

const getOneLanguage = async (req, res) => {
  const language = await service.getOneLanguage(Number(req.params.id));

  if (language) {
    res.status(200).json(language);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener la Language de la base de datos" });
  }

  return language;
};

const createLanguage = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide all required languages" });
  } else {
    const newLanguage = {
      ...req.body,
    };

    const language = await service.createLanguage(newLanguage);

    if (language) {
      res.status(200).json(language);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al crear una Language en la base de datos" });
    }
  }
};

const updateLanguage = async (req, res) => {
  const language = await service.updateLanguage(req.body.id, req.body);

  if (language) {
    res.status(200).json(language);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al editar una Language en la base de datos" });
  }
};

export default {
  getAllLanguages,
  getOneLanguage,
  createLanguage,
  updateLanguage,
};
