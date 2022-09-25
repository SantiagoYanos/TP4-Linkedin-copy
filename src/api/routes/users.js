import { Router } from "express";
import controller from "../../controllers/users/index.js";
const router = Router();

router
  .get("/", controller.getAllUsers)
  .get("/:email", controller.getOneUser)
  .post("/", controller.createUser)
  .put("/", controller.updateUser)
  .put("/:id/active", controller.activeUser)
  .put("/:id/deactive", controller.deactiveUser);

export default router;
