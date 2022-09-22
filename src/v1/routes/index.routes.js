import { Router } from "express";
import { token } from "morgan";
import passport from "passport";

import { createClient } from "redis";

import { v1 } from "uuid";

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
    res.render("index");
  })
  .get("/profile", isLoggedIn, (req, res) => {
    //console.log(req.user);

    res.send("Este es tu perfil");
  })
  .get("/timeline", isLoggedIn, (req, res) => {
    res.send("Acá se ven los posts");
  })
  .get("/settings", isLoggedIn, (req, res) => {
    req.send("Acá se van a poder agregar datos");
  });

export default router;

async function isLoggedIn(req, res, next) {
  if (req.cookies.token) {
    //Lo busca en redis
    const user = await client.get(req.cookies.token);

    if (user) {
      //Si lo encuentra lo actualiza
      await client.set(req.cookies.token, JSON.stringify(user), {
        //Se actualiza el token
        EX: 300,
      });

      req.user = JSON.parse(user);
      return next();
    } else {
      res.clearCookie("token");
    }
  }

  console.log("Se ejecuta");

  if (req.isAuthenticated()) {
    //Crear token

    const newToken = v1(); //Crea un nuevo token

    res.cookie("token", newToken, { expire: new Date() + 300000 }); //Crea una cookie con el token

    await client.set(newToken, JSON.stringify(req.user), {
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
