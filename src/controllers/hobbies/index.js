import service from "../../services/hobbies/index.js";

const getAllHobbies = async (req, res) => {
  const hobbies = await service.getAllHobbies();

  if (hobbies) {
    res.status(200).json(hobbies);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener Hobbies de la base de datos" });
  }

  return hobby;
};

const getOneHobby = async (req, res) => {
  const hobby = await service.getOneHobby(req.body.id);

  if (hobby) {
    res.status(200).json(hobby);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener el Hobby de la base de datos" });
  }

  return hobby;
};

const createHobby = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide all required hobbies" });
  } else {
    const newHobby = {
      ...req.body,
    };

    const hobby = await service.createHobby(newHobby);

    if (hobby) {
      res.status(200).json(hobby);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al crear un Hobby en la base de datos" });
    }
  }
};

const updateHobby = async (req, res) => {
  const hobby = await service.updateHobby(req.body.id, req.body);

  if (hobby) {
    res.status(200).json(hobby);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al editar un Hobby en la base de datos" });
  }
};

export default {
  getAllHobbies,
  getOneHobby,
  createHobby,
  updateHobby,
};
