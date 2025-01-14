const tagDBFunctions = require('../databases/tagDB');
const express = require('express');
const tagRouter = express.Router();

//routes implementation
tagRouter.get("/", async (req, res) => {
    try {
        const tags = await tagDBFunctions.findAll();
        res.json(tags);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

tagRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await tagDBFunctions.findById(id);
        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.json(tag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

tagRouter.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "A name is required" });
        }
        await tagDBFunctions.insert(name);
        res.status(201).json({ message: "Tag created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

tagRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "A name is required" });
        }
        const response = await tagDBFunctions.updateById(id, name);
        if (response === 0) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.json({ message: "Tag updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

tagRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await tagDBFunctions.deleteById(id);
        if (response === 0) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.json({ message: "Tag deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = tagRouter;