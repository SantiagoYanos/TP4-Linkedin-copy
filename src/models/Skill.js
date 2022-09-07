import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllSkills() {
  try {
    const skills = prisma.skill.findMany();

    return skills;
  } catch (err) {
    console.log(err);
  }
}

async function getOneSkill(id) {
  try {
    const skill = prisma.skill.findUnique({
      where: {
        id: id,
      },
    });

    return skill;
  } catch (err) {
    console.log(err);
  }
}

async function createSkill(data) {
  try {
    const skill = prisma.skill.create({
      data: data,
    });

    return skill;
  } catch (err) {
    console.log(err);
  }
}

async function updateSkill(id, data) {
  try {
    const skill = prisma.skill.update({
      where: {
        id: id,
      },
      data: data,
    });

    return skill;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllSkills,
  getOneSkill,
  createSkill,
  updateSkill,
};
