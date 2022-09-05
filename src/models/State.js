import { PrismaClient } from "@prisma/client";
const prisma = PrismaClient();

async function getAllStates() {
  try {
    const states = prisma.state.findMany();

    return states;
  } catch (err) {
    console.log(err);
  }
}

async function getOneState(id) {
  try {
    const state = prisma.state.find({
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
    const state = prisma.state.create({
      data: data,
    });

    return state;
  } catch (err) {
    console.log(err);
  }
}

async function updateState(id, data) {
  try {
    const state = prisma.state.update({
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
