import { Router } from "express";
import controller from "../../controllers/countries/index.js";

const router = Router();

router
  .get("/", controller.getAllCountries)
  .get("/:id", controller.getOneCountry)
  .post("/", controller.createCountry)
  .put("/", controller.updateCountry);
