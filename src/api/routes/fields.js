import { Router } from "express";
import controller from "../../controllers/fields/index.js";

const router = Router();

router
  .get("/", controller.getAllFields)
  .get("/:id", controller.getOneField)
  .post("/", controller.createField)
  .put("/", controller.updateField);
