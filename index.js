const express = require("express");
const sequelize = require("./db");
const Task = require("./models/Task"); // MDU ici je précise que la création de Task par exemple (app.post dans ce fichier) est liée avec le model Task.js
const User = require("./models/User");

const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// Synchronise la base
sequelize.sync().then(() => {
  console.log("Base de données SQLite prête");
});
// sequelize.sync({ force: true }); // pour refresh le sync quand je teste; à changer par le code du dessus quand tout est OK.

// MDU : ROUTES VERS LES TÂCHES/TASKS
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

// MDU : FIN ROUTES VERS LES TÂCHES/TASKS

// MDU : ROUTES VERS LES USERS refaites à la main by myself en suivant la logique que j'avais trouvé avec de l'aide pour les tasks ci-dessus
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/users:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur récupération tâche :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

app.get("/users/auth", async (req, res) => {
  const { login, password } = req.query;

  try {
    const user = await User.findOne({ where: { login, password } });

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

app.listen(3000, () => console.log("API lancée sur http://localhost:3000"));
