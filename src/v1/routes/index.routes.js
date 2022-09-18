import { Router } from "express";
import passport from "passport";

const router = Router();

router
  .get("/", (req, res) => {
    res.send("Bienvenido a TinderJob");
  })
  .get("/profile", (req, res) => {
    res.send("/");
  })
  .get("/timeline")
  .get("/settings");

export default router;
