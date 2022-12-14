import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllOrganizations() {
  try {
    const organizations = await prisma.organization.findMany();
    return organizations;
  } catch (err) {
    console.log(err);
  }
}

async function getOneOrganization(id) {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        id: id,
      },
    });

    return organization;
  } catch (err) {
    console.log(err);
  }
}

async function createOrganization(data) {
  try {
    const newOrganization = await prisma.organization.create({
      data: data,
    });

    return newOrganization;
  } catch (err) {
    console.log(err);
  }
}

async function updateOrganization(id, data) {
  try {
    const editedOrganization = await prisma.organization.update({
      where: {
        id: id,
      },
      data: data,
    });

    return editedOrganization;
  } catch (err) {
    console.log(err);
  }
}

async function activeOrganization(id) {
  const activedOrganization = await prisma.organization.updateOne({
    where: {
      id: id,
    },
    data: {
      active: true,
    },
  });
  return activedOrganization;
}

async function deactiveOrganization(id) {
  const deactivedOrganization = await prisma.organization.updateOne({
    where: {
      id: id,
    },
    data: {
      active: false,
    },
  });
  return deactivedOrganization;
}

export default {
  getAllOrganizations,
  getOneOrganization,
  createOrganization,
  updateOrganization,
  activeOrganization,
  deactiveOrganization,
};
