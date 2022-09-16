import service from "../../services/organizations/index.js";

import { phoneRegex, dateRegex } from "../../utils/regex.js";

const getAllOrganizations = async (req, res) => {
  const organizations = await service.getAllOrganizations();

  if (organizations) {
    return res.status(200).json({
      message: "Organizations obtained successfully!",
      data: organizations,
    });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Organizations from the database" });
  }
};

const getOneOrganization = async (req, res) => {
  const id = Number(req.params.id);

  if (id) {
    const organization = await service.getOneOrganization(id);

    return res.status(200).json({
      message: "Organization obtained successfully!",
      data: organization,
    });
  } else {
    return res.status(400).send("Error: Id Format");
  }
};

const createOrganization = async (req, res) => {
  const { name, field_type_id, founder_id } = req.body;

  if ((!name || !field_type_id, !founder_id)) {
    //Chequeo de si tiene lo obligatorio para poder crearse
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const newOrganization = {
    name,
    field_type_id,
    founder_id,
  };

  if (newOrganization.dateOfFounding) {
    if (!dateRegex.test(newOrganization.dateOfFounding)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid foundation date" });
    } else {
      newOrganization.dateOfFounding = new Date(newOrganization.dateOfFounding);
    }
  }

  const createdOrganization = await service.createOrganization(newOrganization);

  if (createdOrganization) {
    return res.status(200).json({
      message: "Organization created successfully!",
      data: createdOrganization,
    });
  } else {
    return res.status(400).json({
      message: "Error: Creating a Organization in the database",
    });
  }
};

const updateOrganization = async (req, res) => {
  const { name, field_type_id, founder_id } = req.body;

  const newData = {
    name,
    field_type_id,
    founder_id,
  };

  const organization = await service.updateOrganization(req.body.id, newData);

  if (organization) {
    return res.status(200).json({
      message: "Organization edited successfully!",
      data: organization,
    });
  } else {
    return res.status(400).json({
      message: "Error: Editing a Organization in the database",
    });
  }
};

const deactiveOrganization = async (req, res) => {
  const organization = await service.deactiveOrganization(
    Number(req.params.id)
  );

  if (organization) {
    return res.status(200).json({
      message: "Organization deactivated successfully!",
      data: organization,
    });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Deactivating a Organization in the database" });
  }
};

const activeOrganization = async (req, res) => {
  const organization = await service.activeOrganization(Number(req.params.id));

  if (organization) {
    return res
      .status(200)
      .json({
        message: "Organization activated successfully!",
        data: organization,
      });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Activating a Organization in the database" });
  }
};

export default {
  getAllOrganizations,
  getOneOrganization,
  createOrganization,
  updateOrganization,
  activeOrganization,
  deactiveOrganization,
};
