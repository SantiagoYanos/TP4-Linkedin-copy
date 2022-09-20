import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import local_auth from "./auth/strategy.js";
import google_auth from "./auth/oauth-strategy.js";

const app = express();

// Inicializaciones
dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//------------------------------------------------------------

//Rutas

import cityRoute from "./api/routes/cities.js"; //Ciudades
import commentRoute from "./api/routes/comments.js"; //Comentarios
import countryRoute from "./api/routes/countries.js"; //Paises
import fieldRoute from "./api/routes/fields.js"; //Áreas
import field_typeRoute from "./api/routes/field_types.js"; //Tipos de áreas
import hobbyRoute from "./api/routes/hobbies.js"; //Pasatiempos
import languageRoute from "./api/routes/languages.js"; //Lenguajes
import organizationRoute from "./api/routes/organizations.js"; //Organizaciones
import postRoute from "./api/routes/posts.js"; //Posteos
import skillRoute from "./api/routes/skills.js"; //Habilidades
import stateRoute from "./api/routes/states.js"; //Estados/Provincias
import userRoute from "./api/routes/users.js"; //Usuarios

import indexRoute from "./v1/routes/index.routes.js";
import authRoute from "./v1/routes/auth.routes.js";

app.use("/api/cities", cityRoute); //Ruta Ciudades
app.use("/api/comments", commentRoute); //Ruta Comentarios
app.use("/api/countries", countryRoute); //Ruta Paises
app.use("/api/fields", fieldRoute); //Ruta Areas
app.use("/api/field_types", field_typeRoute); //Ruta Tipos de Áreas
app.use("/api/hobbies", hobbyRoute); //Ruta Pasatiempos
app.use("/api/languages", languageRoute); //Ruta Lenguajes
app.use("/api/organizations", organizationRoute); //Ruta Organizaciones
app.use("/api/posts", postRoute); //Ruta Posteos
app.use("/api/skills", skillRoute); //Ruta Habilidades
app.use("/api/states", stateRoute); //Ruta Estados/Provincias
app.use("/api/users", userRoute); //Ruta Usuarios

app.use("/", indexRoute);
app.use("/auth", authRoute);

//------------------------------------------------------------

export default app;
