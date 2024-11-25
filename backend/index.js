const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const locationsRouter = express.Router();
const dbFunctions = require('./database');
const path = require('path');

app.use(express.json());
app.use("/api/locations", locationsRouter);
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

locationsRouter.get("/", async (req, res) => {
    try {
        await dbFunctions.initialize();
        const locations = await dbFunctions.getLocations();
        console.log(locations);
        res.json(locations);
        dbFunctions.close;
    } catch (err) {
        console.error("Database error: ", err);
    }
});

