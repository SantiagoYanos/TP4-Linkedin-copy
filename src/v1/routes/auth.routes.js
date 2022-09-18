import { Router } from "express";
import passport from "passport";

const router = Router();

router
  //Visual Login

  .get("/login", (req, res) => {
    res.send("Login");
  })

  //Envío Login

  .post("/login", async (req, res) => {
    const handler = passport.authenticate("local-login", {
      successRedirect: "../profile",
      failureRedirect: "./login",
      passReqToCallback: true,
    });

    handler(req, res);
  })

  //Visual Register

  .get("/register", (req, res) => {
    res.send("Register");
  })

  //Envío Register

  .post("/register", (req, res) => {
    const handler = passport.authenticate("local-register", {
      successRedirect: "/profile",
      failureRedirect: "/register",
      passReqToCallback: true,
    });

    handler(req, res);
  });

export default router;
