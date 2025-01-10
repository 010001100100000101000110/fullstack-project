const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const wordpairRouter = express.Router();
const tagRouter = express.Router();
const wordpairDBFunctions = require('./wordpairDB');
const tagDBFunctions = require('./tagDB');
const path = require('path');

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/wordpairs", wordpairRouter);
app.use("/api/tags", tagRouter);

//start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

//routes implementation
wordpairRouter.get("/", async (req, res) => {
    try {
        await wordpairDBFunctions.initialize();
        const wordpairs = await wordpairDBFunctions.getWordpairs();
        res.json(wordpairs);
    } catch (err) {
        console.error("Error fetching wordpairs: ", err);
        res.status(500).json({ error: "Failed to fetch wordpairs" });
    }
});

wordpairRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const wordpair = await wordpairDBFunctions.findById(id);
        if (!wordpair) {
            return res.status(404).json({ error: "Wordpair not found" });
        }
        res.json(wordpair);
    } catch (err) {
        console.error("Error fetching wordpair by ID: ", err);
        res.status(500).json({ error: "Failed to fetch wordpair by ID" });
    }
});

wordpairRouter.post("/", async (req, res) => {
    try {
        const { english, finnish, swedish, tags } = req.body;
        console.log("POST REQ BODY: ", req.body);
        if (!english || !finnish || !swedish) {
            return res.status(400).json({ error: "Both fields are required" });
        }
        await wordpairDBFunctions.insert(english, finnish, swedish, tags);
        res.status(201).json({ message: "Wordpair created" });
    } catch (err) {
        console.error("Error creating wordpair: ", err);
        res.status(500).json({ error: "Failed to create wordpair" });
    }
});

wordpairRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const wordpair = req.body;
        if (!wordpair.english || !wordpair.finnish || !wordpair.swedish) {
            return res.status(400).json({ error: "Both fields are required" });
        }
        const response = await wordpairDBFunctions.updateWordpair(id, wordpair);
        if (response === 0) {
            return res.status(404).json({ error: "Wordpair not found" });
        }
        res.json({ message: "Wordpair updated" });
    } catch (err) {
        console.error("Error updating wordpair: ", err);
        res.status(500).json({ error: "Failed to update wordpair" });
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
        console.error("Error deleting wordpair: ", err);
        res.status(500).json({ error: "Failed to delete wordpair" });
    }
})


//tag routing
tagRouter.get("/", async (req, res) => {
    try {
        // const { id, name } = req.query;
        // if (id) {
        //     const tag = await tagDBFunctions.findById(id);
        //     if (!tag) {
        //         return res.status(404).json({ error: "Tag not found" });
        //     }
        //     res.json(tag);
        // } else if (name) {
        //     const tag = await tagDBFunctions.findByName(id);
        //     if (!tag) {
        //         return res.status(404).json({ error: "Tag not found" });
        //     }
        //     res.json(tag);
        // }
        //return all tags
        await tagDBFunctions.initialize();
        const tags = await tagDBFunctions.getTags();
        res.json(tags);
    } catch (err) {
        console.error("Error fetching tags: ", err);
        res.status(500).json({ error: "Failed to fetch tags" });
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
        console.error("Error fetching tag by ID: ", err);
        res.status(500).json({ error: "Failed to fetch tag by ID" });
    }
});

// tagRouter.get("/", async (req, res) => {
//     try {
//         const { id, name } = req.query;
//         if (id) {
//             const tag = await tagDBFunctions.findById(id);
//             if (!tag) {
//                 return res.status(404).json({ error: "Tag not found" });
//             }
//             res.json(tag);
//         } else if (name) {
//             const tag = await tagDBFunctions.findByName(id);
//             if (!tag) {
//                 return res.status(404).json({ error: "Tag not found" });
//             }
//             res.json(tag);
//         }
//         res.status(404).json({ error: "Provide either 'id' or 'name' as query parameter" });
//     } catch (err) {
//         console.error("Error fetching tag: ", err);
//         res.status(500).json({ error: "Failed to fetch tag." });
//     }
// });

tagRouter.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "A name is required" });
        }
        await tagDBFunctions.insert(name);
        res.status(201).json({ message: "Tag created" });
    } catch (err) {
        console.error("Error creating tag: ", err);
        res.status(500).json({ error: "Failed to create tag" });
    }
});

tagRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tag = req.body;
        if (!tag) {
            return res.status(400).json({ error: "A name is required" });
        }
        const response = await tagDBFunctions.updateTag(id, tag);
        if (response === 0) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.json({ message: "Tag updated" });
    } catch (err) {
        console.error("Error updating tag: ", err);
        res.status(500).json({ error: "Failed to update tag" });
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
        console.error("Error deleting tag: ", err);
        res.status(500).json({ error: "Failed to delete tag" });
    }
});
