import { Router } from "express";
import passport from "passport";

import userController from "../../controllers/users/index.js";

const router = Router();

//----------------------------- Login Local

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
      successRedirect: "../profile",
      failureRedirect: "/register",
      passReqToCallback: true,
    });

    handler(req, res);
  });

//----------------------------- Login Google

router.get("/googleRegister", (req, res) => {
  res.send(
    '<form action="/auth/google" method="post"> <label for="POST-name">Nombre:</label> <input id="language_id" type="text" name="language_id"> <input type="submit" value="Save"> </form>'
  );
}); //Página donde se van a poner los primeros datos.

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/profile");
  }
);

export default router;
