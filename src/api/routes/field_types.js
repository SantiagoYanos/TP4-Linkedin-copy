import { Router } from "express";
import controller from "../../controllers/field_types/index.js";

const router = Router();

router
  .get("/", controller.getAllField_types)
  .get("/:id", controller.getOneField_type)
  .post("/", controller.createField_type)
  .put("/", controller.updateField_type);

export default router;
