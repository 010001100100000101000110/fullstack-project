const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const dbFunctions = require('./database');
const path = require('path');

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/wordpairs", router);

//start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

//routes implementation
router.get("/", async (req, res) => {
    try {
        await dbFunctions.initialize();
        const wordpairs = await dbFunctions.getWordpairs();
        res.json(wordpairs);
    } catch (err) {
        console.error("Error fetching wordpairs: ", err);
        res.status(500).json({ error: "Failed to fetch wordpairs" });
    } finally {
        dbFunctions.close();
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const wordpair = await dbFunctions.findById(id);
        if (!wordpair) {
            return res.status(404).json({ error: "Wordpair not found" });
        }
        res.json(wordpair);
    } catch (err) {
        console.error("Error fetching wordpair by ID: ", err);
        res.status(500).json({ error: "Failed to fetch wordpair by ID" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { english, finnish } = req.body;
        if (!english || !finnish) {
            return res.status(400).json({ error: "Both fields are required" });
        }
        await dbFunctions.insert(english, finnish);
        res.status(201).json({ message: "Wordpair created" });
    } catch (err) {
        console.error("Error creating wordpair: ", err);
        res.status(500).json({ error: "Failed to create wordpair" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const wordpair = req.body;
        if (!wordpair.english || !wordpair.finnish) {
            return res.status(400).json({ error: "Both fields are required" });
        }
        const response = await dbFunctions.updateWordpair(id, wordpair);
        if (response === 0) {
            return res.status(404).json({ error: "Wordpair not found" });
        }
        res.json({ message: "Wordpair updated" });
    } catch (err) {
        console.error("Error updating wordpair: ", err);
        res.status(500).json({ error: "Failed to update wordpair" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await dbFunctions.deleteById(id);
        if (response === 0) {
            return res.status(404).json({ error: "wordpair not found" });
        }
        res.json({ message: "Wordpair deleted" });
    } catch (err) {
        console.error("Error deleting wordpair: ", err);
        res.status(500).json({ error: "Failed to delete wordpair" });
    }
})
