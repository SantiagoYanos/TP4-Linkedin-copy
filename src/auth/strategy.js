import passport from "passport";
import dotenv from "dotenv";
import { Strategy as LocalStrategy } from "passport-local";

//Funcion de crear usuario en la bd
import userModel from "../models/User.js";

//Encriptar y desencriptar
import encrypt from "../utils/encrypt.js";

//Acceso al user desde prisma

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Crear una ID única
import { uniqueID } from "../utils/uniqueID.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  done(null, user);
});

//Register | Local Strategy

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        console.log("Registrando un usuario");

        const thereIsUser = await prisma.user.findUnique({
          where: {
            email: username,
            googleId: undefined,
          },
        }); //Buscamos un usuario con el nombre de usuario recibido en el parámetro

        if (thereIsUser) {
          //Si encontró uno...

          //console.log("usuario encontrado");

          return done(null, false, { message: "Username is already taken." }); //Quiere decir que ya existe un usuario con ese nombre (No podemos crear la cuenta)
        } //done es para finalizar, se le pasa: error, usuario, opciones
        else {
          //Si no encontró a ninguno...

          //console.log("usuario no encontrado");

          const {
            name,
            surname,
            avatar,
            birthdate,
            pronouns,
            nationality,
            residence,
            phone,
            description,
            actualJob,
            active,
            status,
            language_id,
            organization_id,
            country_id,
            state_id,
            city_id,
          } = req.body;

          if (!req.body.email) {
            console.log("Please provide all required fields");
            done(err);
          }

          const newUser = {
            id: uniqueID(username),
            name,
            surname,
            email: username,
            password: encrypt.generateHash(password),
            avatar,
            birthdate,
            pronouns,
            nationality,
            residence,
            phone,
            description,
            actualJob,
            active,
            status,
            language_id,
            organization_id,
            country_id,
            state_id,
            city_id, //Password encriptada
          }; //Creamos un nuevo usuario

          const user = await userModel.createUser(newUser); //Guardamos al usuario en la base de datos.

          return done(null, user); //Terminamos, no le pasamos ningún error y le pasamos el usuario.
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

//Login | Local Strategy

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        console.log("asdads");

        const user = await prisma.user.findUnique({
          where: {
            email: username,
            googleId: undefined,
          },
        });

        if (!user) {
          console.log("User not found!!");

          return done(null, false, { message: "User not found!" });
        }

        console.log("User found!!");

        if (!encrypt.validatePassword(password, user.password)) {
          return done(null, false, { message: "Password doesn't match" });
        }

        return done(null, user, { message: "" });
      } catch (err) {
        console.log(err);
      }
    }
  )
);

export default passport;
