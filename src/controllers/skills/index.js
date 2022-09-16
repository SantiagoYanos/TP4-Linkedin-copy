import service from "../../services/skills/index.js";

const getAllSkills = async (req, res) => {
  const skills = await service.getAllSkills();

  if (skills) {
    return res
      .status(200)
      .json({ message: "Skills obtained successfully!", data: skills });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Skills from the database" });
  }
};

const getOneSkill = async (req, res) => {
  const skill = await service.getOneSkill(Number(req.params.id));

  if (skill) {
    return res
      .status(200)
      .json({ message: "Skill obtained successfully!", data: skill });
  } else {
    res
      .status(400)
      .json({ message: "Error: Obtaining a Skill from the database" });
  }
};

const createSkill = async (req, res) => {
  const { name, level, type, field_id } = req.body;

  if (!req.body.field_id || !req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const newSkill = {
    name,
    level,
    type,
    field_id,
  };

  const createdSkill = await service.createSkill(newSkill);

  if (createdSkill) {
    return res
      .status(200)
      .json({ message: "Skill created successfully!", data: createdSkill });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Creating a Skill in the database" });
  }
};

const updateSkill = async (req, res) => {
  const { name, level, type, field_id } = req.body;

  const newData = {
    name,
    level,
    type,
    field_id,
  };

  if (!req.body.id) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  } else {
    const editedSkill = service.updateSkill(req.body.id, newData);

    if (editedSkill) {
      return res
        .status(200)
        .json({ message: "Skill edited successfully!", data: editedSkill });
    } else {
      return res
        .status(400)
        .json({ message: "Error: Editing a Skill in the database" });
    }
  }
};

export default {
  getAllSkills,
  getOneSkill,
  createSkill,
  updateSkill,
};
