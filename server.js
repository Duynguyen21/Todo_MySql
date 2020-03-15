const express = require("express");
const bodyParser = require("body-parser");
const initRouter = require("./src/routers/index");
const db = require("./src/model");

const app = express();

const hostname = "localhost";
const port = process.env.PORT || 8080;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

initRouter(app);


app.listen(port, hostname, () => {
  console.log(`Server is running on port ${hostname}:${port}/`);
});
