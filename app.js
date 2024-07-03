const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = [
  "Creer un Repository GitHub",
  "Developper l'Application Web",
  "Ecrire des Tests",
];

let workItems = [];
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  let date = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let dateString = date.toLocaleDateString("fr-FR", options);

  res.render("list", { listTitle: dateString, newListItems: items });
  // list --> list.ejs
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});


app.post("/test_ajout", function (req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.status(200).json(items);
});

//*********************
app.listen(process.env.PORT || 4200, function () {
  console.log("Server Live Here: http://localhost:4200/");
});

module.exports = app;
