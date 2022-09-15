import { Router } from "express";
import controller from "../../controllers/comments/index.js";
const router = Router();

router
  .get("/:post_id", controller.getPostComments)
  .post("/", controller.createComment)
  .put("/", controller.updateComment)
  .patch("/", controller.activeComment)
  .patch("/", controller.deactiveComment);

export default router;
