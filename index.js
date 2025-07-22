const express = require("express");
const sequelize = require("./db");
const Task = require("./models/Task"); // MDU ici je précise que la création de Task par exemple (app.post dans ce fichier) est liée avec le model Task.js

const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// Synchronise la base
sequelize.sync().then(() => {
  console.log("Base de données SQLite prête");
});
// sequelize.sync({ force: true }); // pour refresh le sync quand je teste; à changer par le code du dessus quand tout est OK.

// Exemples de routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("Erreur création tâche :", error); // 🛠️ log utile ici
    res.status(500).json({ message: "Erreur serveur", error });
  }
  // const task = await Task.create(req.body);
  // res.status(201).json(task) ==>> MDU : commenté au profit du code ci-dessus pour débug les problèmes de création de task qui avait un ID au dessus de zéro (réglé côté Angular)
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    console.error("Erreur mise à jour tâche :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.json(task);
  } catch (error) {
    console.error("Erreur récupération tâche :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
}); // ==>> MDU: sans ca il était impossible de voir le détail (donc de GET) les tâches

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    await task.destroy();
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression tâche :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
}); // ==>> MDU: sans ca il était impossible supprimer les tâches

app.listen(3000, () => console.log("API lancée sur http://localhost:3000"));
