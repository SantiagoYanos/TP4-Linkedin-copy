import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log(err);
  }
}

async function getOneUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        language: true,
        organization: true,
        country: true,
        state: true,
        city: true,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function createUser(data) {
  try {
    const createdUser = await prisma.user.create({
      data: data,
    });
    return createdUser;
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(id, data) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
}

async function activeUser(id) {
  try {
    const activeUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        active: true,
      },
    });
    return activeUser;
  } catch (err) {
    console.log(err);
  }
}

async function deactiveUser(id) {
  try {
    const deactiveUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
    return deactiveUser;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  activeUser,
  deactiveUser,
};
