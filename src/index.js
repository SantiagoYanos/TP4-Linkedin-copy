import app from "../src/app.js";
import https from "https";
import fs from "fs";

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
