import { Router } from "express";
import controller from "../../controllers/lenguages/index.js";

const router = Router();

router
  .get("/", controller.getAllLenguages)
  .get("/:id", controller.getOneLenguage)
  .post("/", controller.createLenguage)
  .put("/", controller.updateLenguage);
