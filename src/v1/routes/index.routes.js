import { Router } from "express";
import { token } from "morgan";
import passport from "passport";
import dotenv from "dotenv";

import fetch from "node-fetch";

import { createClient } from "redis";

import { v1 } from "uuid";

import userController from "../controller/user/index.js";

import https from "https";

dotenv.config();

const router = Router();

const client = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

// const client = createClient({
//   host: "127.0.0.1",
//   port: 6379,
// });

async function connectRedis() {
  try {
    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    console.log("Conectado a redis");
  } catch (err) {
    console.log(err);
  }
}

try {
  connectRedis(); //Se conecta al redis
} catch (err) {
  console.log(err);
}

router
  .get("/", (req, res) => {
    return res.render("index");
  })
  .get("/profile/:email", isLoggedIn, async (req, res) => {
    try {
      let userInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/users/" + req.params.email
      );

      const user = await userInfo.json();

      let postsInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/posts/" + user.data.id
      );

      const posts = await postsInfo.json();

      //console.log(user);

      //console.log(posts);

      return res.render("profile", {
        user: user.data,
        sessionUserID: req.user.id,
        posts: posts.data,
      });
    } catch (err) {
      console.log(err);
      return res.redirect("/");
    }
  })
  .get("/profile/", isLoggedIn, (req, res) => {
    return res.redirect("/profile/" + req.user.email);
  })

  .get("/edit-profile", isLoggedIn, async (req, res) => {
    try {
      const userInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/users/" + req.user.email
      );

      const languagesInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/languages/"
      );

      const organizationsInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/organizations/"
      );

      const countriesInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/countries/"
      );

      const statesInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/states/"
      );

      const citiesInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/cities/"
      );

      const user = await userInfo.json();

      //console.log(user.data);

      const languages = await languagesInfo.json();

      //console.log(languages.data);

      const organizations = await organizationsInfo.json();

      //console.log(organizations.data);

      const countries = await countriesInfo.json();

      //console.log(countries.data);

      const states = await statesInfo.json();

      //console.log(states.data);

      const cities = await citiesInfo.json();

      //console.log(cities.data);

      return res.render("edit-profile", {
        user: user.data,
        languages: languages.data,
        organizations: organizations.data,
        countries: countries.data,
        states: states.data,
        cities: cities.data,
      });
    } catch (err) {
      console.log(err);
      return res.redirect("/");
    }
  })

  .post("/edit-profile", isLoggedIn, (req, res) => {
    req.body.id = req.user.id;

    req.body.status === "" ? (req.body.status = undefined) : null;

    req.body.language_id === ""
      ? (req.body.language_id = undefined)
      : (req.body.language_id = parseInt(req.body.language_id));

    req.body.organization_id === ""
      ? (req.body.organization_id = undefined)
      : (req.body.organization_id = parseInt(req.body.organization_id));

    req.body.country_id === ""
      ? (req.body.country_id = undefined)
      : (req.body.country_id = parseInt(req.body.country_id));

    req.body.state_id === ""
      ? (req.body.state_id = undefined)
      : (req.body.state_id = parseInt(req.body.state_id));

    req.body.city_id === ""
      ? (req.body.city_id = undefined)
      : (req.body.city_id = parseInt(req.body.city_id));

    try {
      userController.updateUser(req);

      return res.status(200).redirect("/profile");
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Error: Updating the user" });
    }
  })

  .get("/new-post", isLoggedIn, (req, res) => {
    res.render("new-post", {});
  })

  .post("/new-post", isLoggedIn, (req, res) => {
    req.body.author_id = req.user.id;

    try {
      userController.createPost(req, res);
      return res.status(200).redirect("/profile");
    } catch (err) {
      console.log(err);
      return res.status(400).json("Error: Creating a new Post");
    }
  })

  .post("/new-comment/:idPost", isLoggedIn, (req, res) => {
    req.body.written_by = req.user.id;

    req.body.post_id = Number(req.params.idPost);

    req.body.active = true;

    try {
      userController.createComment(req);

      //console.log(req);

      return res.status(200).redirect(req.get("Referer"));
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Error: Creating a new comment" });
    }
  })

  .get("/timeline", isLoggedIn, async (req, res) => {
    try {
      let postsInfo = await fetch(
        "https" + "://" + req.get("host") + "/api/posts/"
      );

      const posts = await postsInfo.json();

      res.render("timeline", {
        posts: posts.data,
        sessionUserEmail: req.user.email,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
  })

  .post("/logout", isLoggedIn, (req, res) => {
    req.logOut(function (err) {
      if (err) {
        console.log(err);
        return next(err);
      }

      res.clearCookie("token");
      console.log("Se desconect?? la cuenta");

      return res.redirect("/auth/login");
    });
  });

export default router;

async function isLoggedIn(req, res, next) {
  try {
    if (req.cookies.token) {
      //Lo busca en redis

      let user = null;

      user = await client.get(req.cookies.token);

      //console.log(typeof user);
      //console.log(user);

      user = null;

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
      return res.redirect("/auth/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

// Si te vas al login y ten??s un token, te redirecciona.

// Si te haces una nueva cuenta (S??lo pod??s entrar al register o al login si no ten??s un token)

// Si actualizas tu cuenta, se elimina el token.
