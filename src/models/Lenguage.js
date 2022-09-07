import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllLenguage() {
  try {
    const lenguages = prisma.lenguage.findMany();

    return lenguages;
  } catch (err) {
    console.log(err);
  }
}

async function getOneLenguage(id) {
  try {
    const lenguage = prisma.lenguage.find({
      where: {
        id: id,
      },
    });

    return lenguage;
  } catch (err) {
    console.log(err);
  }
}

async function createLenguage(data) {
  try {
    const lenguage = prisma.lenguage.create({
      data: data,
    });

    return lenguage;
  } catch (err) {
    console.log(err);
  }
}

async function updateLenguage(id, data) {
  try {
    const lenguage = prisma.lenguage.update({
      where: {
        id: id,
      },
      data: data,
    });

    return lenguage;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllLenguage,
  getOneLenguage,
  createLenguage,
  updateLenguage,
};
