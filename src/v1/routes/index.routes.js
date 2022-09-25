import { Router } from "express";
import { token } from "morgan";
import passport from "passport";

import fetch from "node-fetch";

import { createClient } from "redis";

import { v1 } from "uuid";

import userController from "../controller/user/index.js";

import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

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
  .get("/profile/:email", isLoggedIn, async (req, res) => {
    let userInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/users/" + req.params.email,
      {
        agent: httpsAgent,
      }
    );

    const user = await userInfo.json();

    let postsInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/posts/" + user.data.id,
      {
        agent: httpsAgent,
      }
    );

    const posts = await postsInfo.json();

    //console.log(user);

    //console.log(posts);

    return res.render("profile", {
      user: user.data,
      sessionUserID: req.user.id,
      posts: posts.data,
    });
  })
  .get("/profile/", isLoggedIn, async (req, res) => {
    return res.redirect("/profile/" + req.user.email);
  })

  .get("/edit-profile", isLoggedIn, async (req, res) => {
    const userInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/users/" + req.user.email,
      {
        agent: httpsAgent,
      }
    );

    const languagesInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/languages/",
      {
        agent: httpsAgent,
      }
    );

    const organizationsInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/organizations/",
      {
        agent: httpsAgent,
      }
    );

    const countriesInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/countries/",
      {
        agent: httpsAgent,
      }
    );

    const statesInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/states/",
      {
        agent: httpsAgent,
      }
    );

    const citiesInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/cities/",
      {
        agent: httpsAgent,
      }
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
    let postsInfo = await fetch(
      req.protocol + "://" + req.get("host") + "/api/posts/",
      {
        agent: httpsAgent,
      }
    );

    const posts = await postsInfo.json();

    res.render("timeline", {
      posts: posts.data,
      sessionUserEmail: req.user.email,
    });
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
    return res.redirect("/auth/login");
  }
}

// Si te vas al login y tenés un token, te redirecciona.

// Si te haces una nueva cuenta (Sólo podés entrar al register o al login si no tenés un token)

// Si actualizas tu cuenta, se elimina el token.
