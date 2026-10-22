require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Schema MongoDB
const itemSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
});

// Modele MongoDB
const Item = mongoose.model("Item", itemSchema);

// Route 1 : Verifier le serveur
app.get("/api/health", (req, res) => {
    res.json({ message: "Serveur actif" });
});

// Route 2 : Afficher les articles
app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

// Route 3 : Ajouter un article
app.post("/api/items", async (req, res) => {
    try {
        const nom = req.body?.nom;

        if (typeof nom !== "string" || nom.trim() === "") {
            return res.status(400).json({
                message: "Nom obligatoire"
            });
        }

        const item = new Item({
            nom: nom.trim()
        });

        await item.save();

        res.status(201).json(item);

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connecte avec succes !");

        app.listen(PORT, () => {
            console.log("Serveur demarre sur le port " + PORT);
        });
    })
    .catch(error => {
        console.log("Erreur MongoDB :", error.message);
    });