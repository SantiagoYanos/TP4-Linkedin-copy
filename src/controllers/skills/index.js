import service from "../../services/skills/index.js";

const getAllSkills = async (req, res) => {
  const skills = await service.getAllSkills();

  if (skills) {
    res.status(200).json(skills);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener las Skills de la base de datos" });
  }
};

const getOneSkill = async (req, res) => {
  const skill = await service.getOneSkill(req.params.id);

  if (skill) {
    res.status(200).json(skill);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener una Skill de la base de datos" });
  }
};

const createSkill = async (req, res) => {
  if (!req.body.field_id || !req.body.name) {
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newSkill = {
    ...req.body,
  };

  const createdSkill = await service.createSkill(newSkill);

  if (createdSkill) {
    res.status(200).json(createdSkill);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al crear una skill en la base de datos" });
  }
};

const updateSkill = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ message: "Please provide all required fields" });
  } else {
    const editedSkill = service.updateSkill(req.body.id, req.body);

    if (editedSkill) {
      res.status(200).json(editedSkill);
    } else {
      res
        .status(400)
        .json({ message: "Error: Al editar una skill de la base de datos" });
    }
  }
};

export default {
  getAllSkills,
  getOneSkill,
  createSkill,
  updateSkill,
};
