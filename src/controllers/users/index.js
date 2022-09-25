import service from "../../services/users/index.js";
import { avatarRegex, emailRegex, phoneRegex } from "../../utils/regex.js";
import { uniqueID } from "../../utils/uniqueID.js";

const getAllUsers = async (req, res) => {
  const users = await service.getAllUsers();

  if (users) {
    return res
      .status(200)
      .json({ message: "Users obtained successfully!", data: users });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Users from the database" });
  }
};

const getOneUser = async (req, res) => {
  const user = await service.getOneUser(req.params.email);

  if (user) {
    return res
      .status(200)
      .json({ message: "User obtained successfully!", data: user });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining a User from the database" });
  }
};

const createUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  } = req.body;

  if (!req.body.email) {
    return res
      .status(400)
      .json({ msg: "Error: Please provide all required fields" });
  }

  const newUser = {
    id: uniqueID(req.body.email),
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  };

  if (!newUser.name || !newUser.email || !newUser.password) {
    return res
      .status(400)
      .json({
        message: "Please provide all required fields",
      })
      .end();
  }

  if (newUser.phone) {
    if (!phoneRegex.test(newUser.phone)) {
      return res
        .status(400)
        .json({
          message: "Please provide a valid phone number",
        })
        .end();
    }
  }

  if (!emailRegex.test(newUser.email) || !avatarRegex.test(newUser.avatar)) {
    return res
      .status(400)
      .json({
        message: "Please provide valid data",
      })
      .end();
  }

  console.log(newUser);

  const user = await service.createUser(newUser);

  if (user) {
    return res
      .status(200)
      .json({ message: "User created successfully!", data: user });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Creating a User in the database" });
  }
};

const updateUser = async (req, res) => {
  const {
    id,
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  } = req.body;

  const newData = {
    id,
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  };

  const user = await service.updateUser(id, newData);

  if (user) {
    return res
      .status(200)
      .json({ message: "User edited successfully!", data: user });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a User in the database" });
  }
};

const deactiveUser = async (req, res) => {
  const user = await service.deactiveUser(req.params.id);

  if (user) {
    return res
      .status(200)
      .json({ message: "User deactivated successfully!", data: user });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Deactivating a User in the database" });
  }
};

const activeUser = async (req, res) => {
  const user = await service.activeUser(req.params.id);

  if (user) {
    return res
      .status(200)
      .json({ message: "User activated successfully!", data: user });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Activating a User in the database" });
  }
};

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  activeUser,
  deactiveUser,
};
