import { Router } from "express";
import { token } from "morgan";
import passport from "passport";

import { createClient } from "redis";

import { v1 } from "uuid";

import userController from "../controller/user/index.js";

const router = Router();

const client = createClient({
  host: "127.0.0.1",
  port: 6379,
});

async function connectRedis() {
  try {
    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    console.log("Conectado a redis");
  } catch (err) {
    console.log(err);
  }
}

connectRedis(); //Se conecta al redis

router
  .get("/", (req, res) => {
    return res.render("index");
  })
  .get("/profile/:email", isLoggedIn, (req, res) => {
    return res.render("profile", { userEmail: req.params.email });
  })
  .get("/profile/", isLoggedIn, (req, res) => {
    return res.render("profile", { userEmail: req.user.email });
  })
  .get("/timeline", isLoggedIn, (req, res) => {
    return res.render("timeline", {});
  })
  .post("/logout", isLoggedIn, (req, res) => {
    req.logOut(function (err) {
      if (err) {
        console.log(err);
        return next(err);
      }

      res.clearCookie("token");
      console.log("Se desconectó la cuenta");

      return res.redirect("/auth/login");
    });
  })

  .get("/edit-profile", isLoggedIn, (req, res) => {
    return res.render("edit-profile", { user: req.user });
  })

  .post("/edit-profile", isLoggedIn, (req, res) => {
    req.body.id = req.user.id;

    userController.updateUser(req);

    return res.status(200).redirect("/profile");
  })

  .get("/new-post", isLoggedIn, (req, res) => {
    res.render("new-post", {});
  })

  .post("/new-post", isLoggedIn, (req, res) => {
    req.body.author_id = req.user.id;
    userController.createPost(req, res);

    return res.status(200).redirect("/profile");
  });

export default router;

async function isLoggedIn(req, res, next) {
  if (req.cookies.token) {
    //Lo busca en redis

    let user = null;

    try {
      user = await client.get(req.cookies.token);

      //console.log(typeof user);
      //console.log(user);
    } catch (err) {
      user = null;
    }

    if (user != null) {
      //Si lo encuentra lo actualiza
      await client.set(req.cookies.token, user, {
        //Se actualiza el token
        EX: 300,
      });

      user = Buffer.from(user, "base64").toString("utf8");

      req.user = JSON.parse(user);

      // console.log(req.user);

      return next();
    } else {
      res.clearCookie("token");
    }
  }

  //console.log("Se ejecuta");

  if (req.isAuthenticated()) {
    //Crear token

    const newToken = v1(); //Crea un nuevo token

    res.cookie("token", newToken, { expire: new Date() + 300000 }); //Crea una cookie con el token

    //console.log(req.user);

    const userText = JSON.stringify(req.user);

    //console.log(userText);

    const encoded = Buffer.from(userText, "utf8").toString("base64");

    //console.log(encoded);

    await client.set(newToken, encoded, {
      EX: 300,
    });

    //-----------

    return next();
  } else {
    return res.redirect("./auth/login");
  }
}

// Si te vas al login y tenés un token, te redirecciona.

// Si te haces una nueva cuenta (Sólo podés entrar al register o al login si no tenés un token)

// Si actualizas tu cuenta, se elimina el token.
