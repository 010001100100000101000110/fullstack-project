const wordpairDBFunctions = require('../databases/wordpairDB');
const express = require('express');
const wordpairRouter = express.Router();

//routes implementation
wordpairRouter.get("/", async (req, res) => {
    //Filtering---
    if (Object.keys(req.query).length > 0) {
        //get filtered results
        try {
            const { filter } = req.query;
            const wordpairs = await wordpairDBFunctions.findAllFiltered(filter);
            res.status(200).json(wordpairs);
            return;
        } catch (err) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
    //Regular get all
    try {
        const wordpairs = await wordpairDBFunctions.findAll();
        res.json(wordpairs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


wordpairRouter.get("/:id([0-9]+)", async (req, res) => {
    try {
        const { id } = req.params;
        const wordpair = await wordpairDBFunctions.findById(id);
        if (!wordpair) {
            return res.status(404).json({ error: `No wordpair with id ${id}` });
        }
        res.json(wordpair);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

wordpairRouter.post("/", async (req, res) => {
    try {
        const { english, finnish, swedish, tags } = req.body;
        if (!english || !finnish || !swedish) {
            return res.status(400).json({ error: "Both fields are required" });
        }
        await wordpairDBFunctions.insert(english, finnish, swedish, tags);
        res.status(201).json({ message: "Wordpair created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

wordpairRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const wordpair = req.body;
        if (!wordpair.english || !wordpair.finnish || !wordpair.swedish) {
            return res.status(400).json({ error: "Both fields are required" });
        }
        const response = await wordpairDBFunctions.updateById(id, wordpair);
        if (response === 0) {
            return res.status(404).json({ error: "Wordpair not found" });
        }
        res.json({ message: "Wordpair updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

wordpairRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await wordpairDBFunctions.deleteById(id);
        if (response === 0) {
            return res.status(404).json({ error: "wordpair not found" });
        }
        res.json({ message: "Wordpair deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = wordpairRouter;