import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllField_types() {
  try {
    const field_types = await prisma.field_type.findMany();

    return field_types;
  } catch (err) {
    console.log(err);
  }
}

async function getOneField_type(id) {
  try {
    const field_type = await prisma.field_type.findUnique({
      where: {
        id: id,
      },
    });

    return field_type;
  } catch (err) {
    console.log(err);
  }
}

async function createField_type(data) {
  try {
    const field_type = await prisma.field_type.create({
      data: data,
    });

    return field_type;
  } catch (err) {
    console.log(err);
  }
}

async function updateField_type(id, data) {
  try {
    const field_type = await prisma.field_type.update({
      where: {
        id: id,
      },
      data: data,
    });

    return field_type;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllField_types,
  getOneField_type,
  createField_type,
  updateField_type,
};
