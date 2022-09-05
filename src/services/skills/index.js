import Skill from "../../models/Skill.js";

const getAllSkills = () => {
  const skills = Skill.getAllSkills();

  return skills;
};

const getOneSkill = (id) => {
  const skill = Skill.getOneSkill(id);

  return skill;
};

const createSkill = (data) => {
  const skill = Skill.createSkill(data);

  return skill;
};

const updateSkill = (id, data) => {
  const skill = Skill.updateSkill(id, data);

  return skill;
};

export default {
  getAllSkills,
  getOneSkill,
  createSkill,
  updateSkill,
};
