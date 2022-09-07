import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllCities() {
  try {
    const cities = prisma.city.findMany();

    return cities;
  } catch (err) {
    console.log(err);
  }
}

async function getOneCity(id) {
  try {
    const city = prisma.city.findUnique({
      where: {
        id: id,
      },
    });

    return city;
  } catch (err) {
    console.log(err);
  }
}

async function createCity(data) {
  try {
    const city = prisma.city.create({
      data: data,
    });

    return city;
  } catch (err) {
    console.log(err);
  }
}

async function updateCity(id, data) {
  try {
    const city = prisma.city.update({
      where: {
        id: id,
      },
      data: data,
    });

    return city;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllCities,
  getOneCity,
  createCity,
  updateCity,
};
