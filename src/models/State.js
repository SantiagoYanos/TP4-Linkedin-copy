import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllStates() {
  try {
    const states = await prisma.state.findMany();

    return states;
  } catch (err) {
    console.log(err);
  }
}

async function getOneState(id) {
  try {
    const state = await prisma.state.findUnique({
      where: {
        id: id,
      },
    });

    return state;
  } catch (err) {
    console.log(err);
  }
}

async function createState(data) {
  try {
    const state = await prisma.state.create({
      data: data,
    });

    return state;
  } catch (err) {
    console.log(err);
  }
}

async function updateState(id, data) {
  try {
    const state = await prisma.state.update({
      where: {
        id: id,
      },
      data: data,
    });

    return state;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllStates,
  getOneState,
  createState,
  updateState,
};
