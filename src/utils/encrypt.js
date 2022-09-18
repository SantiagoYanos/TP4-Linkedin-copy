import bcrypt from "bcrypt";

const generateHash = (password) => {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  return hash;
};

const validatePassword = function (password, encrypted) {
  return bcrypt.compareSync(password, encrypted);
};

export default {
  generateHash,
  validatePassword,
};
