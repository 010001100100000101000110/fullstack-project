const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const wordpairRouter = require("./routes/wordpairRoutes.js");
const tagRouter = require("./routes/tagRoutes.js");
const wordpairDBFunctions = require('./databases/wordpairDB.js');
const tagDBFunctions = require('./databases/tagDB.js');

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/wordpairs", wordpairRouter);
app.use("/api/tags", tagRouter);

//start server
app.listen(port, () => {
    console.info(`Server running on port ${port}`)
});

//initialize databases
wordpairDBFunctions.initialize();
tagDBFunctions.initialize();
