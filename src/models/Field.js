import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllFields() {
  try {
    const fields = await prisma.field.findMany();

    return fields;
  } catch (err) {
    console.log(err);
  }
}

async function getOneField(id) {
  try {
    const field = await prisma.field.findUnique({
      where: {
        id: id,
      },
    });

    return field;
  } catch (err) {
    console.log(err);
  }
}

async function createField(data) {
  try {
    const field = await prisma.field.create({
      data: data,
    });

    return field;
  } catch (err) {
    console.log(err);
  }
}

async function updateField(id, data) {
  try {
    const field = await prisma.field.update({
      where: {
        id: id,
      },
      data: data,
    });

    return field;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllFields,
  getOneField,
  createField,
  updateField,
};
