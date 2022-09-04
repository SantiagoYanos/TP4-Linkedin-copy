import service from "../../services/organizations/index.js";

import { phoneRegex, dateRegex } from "../../utils/regex.js";

const getAllOrganizations = async (req, res) => {
  const organizations = await service.getAllOrganizations();

  res.status(200).json(organizations);
};

const getOneOrganization = async (req, res) => {
  const id = req.body.id;

  if (id) {
    const organization = await service.getOneOrganization(id);

    res.status(200).json(organization);
  } else {
    res.status(400).send("Error: Id Format");
  }
};

const createOrganization = async (req, res) => {
  const { name, field, founder_id } = req.body;

  if (!name || !field || !founder_id) {
    //Chequeo de si tiene lo obligatorio para poder crearse
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newOrganization = {
    ...req.body,
  };

  if (newOrganization.dateOfFounding) {
    !dateRegex.test(newOrganization.dateOfFounding)
      ? res
          .status(400)
          .json({ message: "Please provide a valid foundation date" })
      : null;
  }

  const createdOrganization = await service.createOrganization(newOrganization);

  if (createdOrganization) {
    res.status(200).json(createOrganization);
  } else {
    res.status(400).json({
      message: "Error: Al crear una Organización en la base de datos",
    });
  }
};

const updateOrganization = async (req, res) => {
  const organization = await service.updateOrganization(req.body.id, req.body);

  if (organization) {
    res.status(200).json({ organization });
  } else {
    res.status(400).json({
      message: "Error: Al editar una Organización en la base de datos",
    });
  }
};

const deactiveOrganization = async (req, res) => {
  const organization = await service.deactiveOrganization(req.params.id);
  res.status(200).json(organization);
};

const activeOrganization = async (req, res) => {
  const organization = await service.activeOrganization(req.params.id);
  res.status(200).json(organization);
};

export default {
  getAllOrganizations,
  getOneOrganization,
  createOrganization,
  updateOrganization,
  activeOrganization,
  deactiveOrganization,
};
