import service from "../../services/hobbies/index.js";

const getAllHobbies = async (req, res) => {
  const hobbies = await service.getAllHobbies();

  if (hobbies) {
    return res
      .status(200)
      .json({ message: "Hobbies obtained successfully!", data: hobbies });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Hobbies from the database" });
  }

  return hobbies;
};

const getOneHobby = async (req, res) => {
  const hobby = await service.getOneHobby(Number(req.params.id));

  if (hobby) {
    return res
      .status(200)
      .json({ message: "Hobby obtained successfully!", data: hobby });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining a Hobby from the database" });
  }

  return hobby;
};

const createHobby = async (req, res) => {
  const { name, user_id } = req.body;

  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide all required hobbies" });
  } else {
    const newHobby = {
      name,
      user_id,
    };

    const hobby = await service.createHobby(newHobby);

    if (hobby) {
      return res
        .status(200)
        .json({ message: "Hobby created successfully!", data: hobby });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Creating a Hobby in the database" });
    }
  }
};

const updateHobby = async (req, res) => {
  const { name, user_id } = req.body;

  const newData = {
    name,
    user_id,
  };

  const hobby = await service.updateHobby(req.body.id, newData);

  if (hobby) {
    return res
      .status(200)
      .json({ message: "Hobby edited successfully!", data: hobby });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a Hobby in the database" });
  }
};

export default {
  getAllHobbies,
  getOneHobby,
  createHobby,
  updateHobby,
};
