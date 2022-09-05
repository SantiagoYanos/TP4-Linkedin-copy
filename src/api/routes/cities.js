import { Router } from "express";
import controller from "../../controllers/cities/index.js";

const router = Router();

router
  .get("/", controller.getAllCities)
  .get("/:id", controller.getOneCity)
  .post("/", controller.createCity)
  .put("/", controller.updateCity);
