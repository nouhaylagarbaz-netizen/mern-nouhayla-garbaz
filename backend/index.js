require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Liste temporaire des articles
let items = [];

// Route 1 : Verifier le serveur
app.get("/api/health", (req, res) => {
    res.json({
        message: "Serveur actif"
    });
});

// Route 2 : Afficher les articles
app.get("/api/items", (req, res) => {
    res.json(items);
});

// Route 3 : Ajouter un article
app.post("/api/items", (req, res) => {

    const nom = req.body.nom;

    if (typeof nom !== "string" || nom.trim() === "") {
        return res.status(400).json({
            message: "Le nom est obligatoire"
        });
    }

    const item = {
        id: items.length + 1,
        nom: nom.trim()
    };

    items.push(item);

    res.status(201).json(item);
});

// Demarrer le serveur
app.listen(PORT, () => {
    console.log("Serveur demarre sur le port " + PORT);
});