import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllLanguages() {
  try {
    const languages = await prisma.language.findMany();

    return languages;
  } catch (err) {
    console.log(err);
  }
}

async function getOneLanguage(id) {
  try {
    const language = await prisma.language.findUnique({
      where: {
        id: id,
      },
    });

    return language;
  } catch (err) {
    console.log(err);
  }
}

async function createLanguage(data) {
  try {
    const language = await prisma.language.create({
      data: data,
    });

    return language;
  } catch (err) {
    console.log(err);
  }
}

async function updateLanguage(id, data) {
  try {
    const language = await prisma.language.update({
      where: {
        id: id,
      },
      data: data,
    });

    return language;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllLanguages,
  getOneLanguage,
  createLanguage,
  updateLanguage,
};
