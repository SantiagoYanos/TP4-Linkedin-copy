import { PrismaClient } from "@prisma/client";
const prisma = PrismaClient();

async function getAllCountries() {
  try {
    const countries = prisma.country.findMany();

    return countries;
  } catch (err) {
    console.log(err);
  }
}

async function getOneCountry(id) {
  try {
    const country = prisma.country.find({
      where: {
        id: id,
      },
    });

    return country;
  } catch (err) {
    console.log(err);
  }
}

async function createCountry(data) {
  try {
    const country = prisma.country.create({
      data: data,
    });

    return country;
  } catch (err) {
    console.log(err);
  }
}

async function updateCountry(id, data) {
  try {
    const country = prisma.country.update({
      where: {
        id: id,
      },
      data: data,
    });

    return country;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllCountries,
  getOneCountry,
  createCountry,
  updateCountry,
};
