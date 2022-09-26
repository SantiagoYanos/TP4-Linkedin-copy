import app from "../src/app.js";
import https from "https";
import fs from "fs";

const PORT = process.env.PORT || 3000;

// https
//   .createServer(
//     {
//       key: fs.readFileSync("./src/certs/key.pem"),
//       cert: fs.readFileSync("./src/certs/certificate.pem"),
//     },
//     app
//   )
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
