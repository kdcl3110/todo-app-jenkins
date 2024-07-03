const express = require("express"); 
const bodyParser = require("body-parser"); // Importation du module body-parser pour parser les requêtes
const app = express(); // Création d'une instance Express

// Tableau initial des tâches
let items = [
  "Creer un Repository GitHub",
  "Developper l'Application Web",
  "Ecrire des Tests",
];

// Configuration du moteur de rendu EJS pour les vues
app.set("view engine", "ejs");

// Utilisation de body-parser pour parser les requêtes URL-encoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json()); // Middleware pour parser les requêtes JSON
app.use(express.static("public")); // Servir des fichiers statiques depuis le dossier "public"

// Route principale pour afficher la liste des tâches
app.get("/", function (req, res) {
  let date = new Date(); 

  // Options pour formater la date en français
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let dateString = date.toLocaleDateString("fr-FR", options); // Conversion de la date en chaîne formatée

  res.render("list", { listTitle: dateString, newListItems: items });
});

// Route pour ajouter une nouvelle tâche à la liste
app.post("/", function (req, res) {
  let item = req.body.newItem; // Récupération de la nouvelle tâche depuis le corps de la requête
  items.push(item); // Ajout de la nouvelle tâche à la liste
  res.redirect("/"); // Redirection vers la page principale pour afficher la liste mise à jour
});

// Route pour ajouter une nouvelle tâche via une API et renvoyer la liste mise à jour
app.post("/test_ajout", function (req, res) {
  let item = req.body.newItem; // Récupération de la nouvelle tâche depuis le corps de la requête
  items.push(item); // Ajout de la nouvelle tâche à la liste
  res.status(200).json(items); // Renvoi de la liste mise à jour en réponse JSON avec le statut 200
});

// Démarrage du serveur sur le port spécifié dans la variable d'environnement PORT ou sur le port 4200 par défaut
app.listen(process.env.PORT || 4200, function () {
  console.log("Server Live Here: http://localhost:4200/");
});

module.exports = app;