import { Router } from "express";
import controller from "../../controllers/comments/index.js";
const router = Router();

router
  .get("/", controller.getPostComments)
  .post("/", controller.createComment)
  .put("/", controller.updateComment)
  .patch("/", controller.activeComment)
  .patch("/", controller.deactiveComment);
