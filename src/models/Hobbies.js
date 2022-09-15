import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllHobbies() {
  try {
    const hobbies = await prisma.hobby.findMany();

    return hobbies;
  } catch (err) {
    console.log(err);
  }
}

async function getOneHobby(id) {
  try {
    const hobby = await prisma.hobby.findUnique({
      where: {
        id: id,
      },
    });

    return hobby;
  } catch (err) {
    console.log(err);
  }
}

async function createHobby(data) {
  try {
    const hobby = await prisma.hobby.create({
      data: data,
    });

    return hobby;
  } catch (err) {
    console.log(err);
  }
}

async function updateHobby(id, data) {
  try {
    const hobby = await prisma.hobby.update({
      where: {
        id: id,
      },
      data: data,
    });

    return hobby;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllHobbies,
  getOneHobby,
  createHobby,
  updateHobby,
};
