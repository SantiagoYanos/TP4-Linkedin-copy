import app from "../src/app.js";
import https from "https";
import fs from "fs";

//------------------------------------------------------------

//Rutas

import cityRoute from "./api/routes/cities.js"; //Ciudades
import commentRoute from "./api/routes/comments.js"; //Comentarios
import countryRoute from "./api/routes/countries.js"; //Paises
import fieldRoute from "./api/routes/fields.js"; //Áreas
import hobbyRoute from "./api/routes/hobbies.js"; //Pasatiempos
import lenguageRoute from "./api/routes/lenguages.js"; //Lenguajes
import organizationRoute from "./api/routes/organizations.js"; //Organizaciones
import postRoute from "./api/routes/posts.js"; //Posteos
import skillRoute from "./api/routes/skills.js"; //Habilidades
import stateRoute from "./api/routes/states.js"; //Estados/Provincias
import userRoute from "./api/routes/users.js"; //Usuarios

app.use("/api/cities", cityRoute); //Ruta Ciudades
app.use("/api/comments", commentRoute); //Ruta Comentarios
app.use("/api/countries", countryRoute); //Ruta Paises
app.use("/api/fields", fieldRoute); //Ruta Areas
app.use("/api/hobbies", hobbyRoute); //Ruta Pasatiempos
app.use("/api/lenguages", lenguageRoute); //Ruta Lenguajes
app.use("/api/organizations", organizationRoute); //Ruta Organizaciones
app.use("/api/posts", postRoute); //Ruta Posteos
app.use("/api/skills", skillRoute); //Ruta Habilidades
app.use("/api/states", stateRoute); //Ruta Estados/Provincias
app.use("/api/users", userRoute); //Ruta Usuarios

//------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Index");
});

https
  .createServer(
    {
      key: fs.readFileSync("./src/certs/key.pem"),
      cert: fs.readFileSync("./src/certs/certificate.pem"),
    },
    app
  )
  .listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
