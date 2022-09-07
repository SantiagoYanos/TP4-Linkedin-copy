import service from "../../services/users/index.js";
import { avatarRegex, emailRegex, phoneRegex } from "../../utils/regex.js";
import { uniqueID } from "../../utils/uniqueID.js";

const getAllUsers = async (req, res) => {
  const users = await service.getAllUsers();
  res.status(200).json(users);
};

const getOneUser = async (req, res) => {
  const user = await service.getOneUser(req.params.name);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ msg: "Falta el mail wachin" });
  }

  const newUser = {
    ...req.body,
    id: uniqueID(req.body.email),
  };

  if (!newUser.name || !newUser.email || !newUser.password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  if (newUser.phone) {
    !phoneRegex.test(newUser.phone)
      ? res.status(400).json({ message: "Please provide a valid phone number" })
      : null;
  }

  if (!emailRegex.test(newUser.email) || !avatarRegex.test(newUser.avatar)) {
    return res.status(400).json({
      message: "Please provide valid data",
    });
  }

  const user = await service.createUser(req.body);
  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const user = await service.updateUser(req.params.id, req.body);
  res.status(200).json(user);
};

const deactiveUser = async (req, res) => {
  const user = await service.deactiveUser(req.params.id);
  res.status(200).json(user);
};

const activeUser = async (req, res) => {
  const user = await service.activeUser(req.params.id);
  res.status(200).json(user);
};

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  activeUser,
  deactiveUser,
};
