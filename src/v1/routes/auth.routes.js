import { Router } from "express";
import passport from "passport";

const router = Router();

//----------------------------- Login Local

router
  //Visual Login

  .get("/login", (req, res) => {
    if (req.user || req.cookies.token) {
      return res.redirect("../profile");
    }
    return res.render("login");
  })

  //Envío Login

  .post("/login", async (req, res) => {
    try {
      const handler = passport.authenticate("local-login", {
        successRedirect: "../profile",
        failureRedirect: "./login",
        passReqToCallback: true,
      });

      return handler(req, res);
    } catch (err) {
      console.log(err);
    }
  })

  //Visual Register

  .get("/register", (req, res) => {
    if (req.user || req.cookies.token) {
      return res.redirect("../profile");
    }
    return res.render("register");
  })

  //Envío Register

  .post("/register", (req, res) => {
    const handler = passport.authenticate("local-register", {
      successRedirect: "../profile",
      failureRedirect: "./register",
      passReqToCallback: true,
    });

    return handler(req, res);
  });

//----------------------------- Login Google

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
    return res.redirect("/profile");
  }
);

export default router;
