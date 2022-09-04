import Organization from "../../models/Organization.js";

const getAllOrganizations = () => {
  const organizations = Organization.getAllOrganizations();

  return organizations;
};

const getOneOrganization = (id) => {
  const organization = Organization.getOneOrganization(id);

  return organization;
};

const createOrganization = (data) => {
  const newOrganization = Organization.createOrganization(data);

  return newOrganization;
};

const updateOrganization = (id, data) => {
  const editedOrganization = Organization.updateOrganization(id, data);

  return editedOrganization;
};

const deactiveOrganization = (id) => {
  const organization = Organization.deactiveOrganization(id);
  return organization;
};

const activeOrganization = (id) => {
  const organization = Organization.activeOrganization(id);
  return organization;
};

export default {
  getAllOrganizations,
  getOneOrganization,
  createOrganization,
  updateOrganization,
  activeOrganization,
  deactiveOrganization,
};
