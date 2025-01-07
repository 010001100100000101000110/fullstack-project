const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const dbFunctions = require('./database');
const path = require('path');

app.use(express.json());
app.use("/api/wordpairs", router);
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

router.get("/", async (req, res) => {
    try {
        await dbFunctions.initialize();
        const wordpairs = await dbFunctions.getWordpairs();
        console.log(wordpairs);
        res.json(wordpairs);
        dbFunctions.close;
    } catch (err) {
        console.error("Database error: ", err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID!!! ", id);
        const wordpair = await dbFunctions.findById(id);
        console.log(wordpair);
        res.json(wordpair);
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).json({ error: "Database error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { english, finnish } = req.body;
        if (!english || !finnish) {
            return res.status(400).json();
        }
        await dbFunctions.insert(english, finnish);
        res.status(201).json();
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).json();
    }
});

router.put("/:id", async (req, res) => {

    const { id } = req.params;
    console.log("IN PUT REQ");
    const { english, finnish } = req.body;
    console.log(id, english, finnish);

    if (!english || !finnish) {
        return res.status(400).json();
    }

    try {
        const response = await dbFunctions.updateWordpair(id, english, finnish);
        if (response === 0) {
            return res.status(404).json({ error: "wordpair not found" });
        }
        res.json({ message: "Wordpair updated" });
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).json();
    }
});
router.delete("/:id", async (req, res) => {
    console.log("IN DELETE");
    const { id } = req.params;
    console.log("IN DELETE", id);
    try {
        const response = await dbFunctions.deleteById(id);
        if (response === 0) {
            return res.status(404).json({ error: "wordpair not found" });
        }
        res.json({ message: "Wordpair deleted" });
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).json();
    }
})
