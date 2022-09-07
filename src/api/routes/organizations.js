import { Router } from "express";
import controller from "../../controllers/organizations/index.js";
const router = Router();

router
  .get("/", controller.getAllOrganizations)
  .get("/:id", controller.getOneOrganization)
  .post("/", controller.createOrganization)
  .put("/", controller.updateOrganization)
  .patch("/:id", controller.activeOrganization)
  .patch("/:id", controller.deactiveOrganization);

export default router;
