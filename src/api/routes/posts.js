import { Router } from "express";
import controller from "../../controllers/posts/index.js";
const router = Router();

router
  .get("/", controller.getAllPosts)
  .get("/:id", controller.getOnePost)
  .post("/", controller.createPost)
  .put("/", controller.updatePost)
  .patch("/", controller.activePost)
  .patch("/", controller.deactivePost);

export default router;
