import { Router } from "express";
import controller from "../../controllers/skills/index.js";

const router = Router();

router
  .get("/", controller)
  .get("/:id", controller.getOneSkill)
  .post("/", controller.createSkill)
  .put("/", controller.updateSkill);
