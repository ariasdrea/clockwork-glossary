const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { getSlovos, getMeaning } = require("./db");
const { addDataInDb } = require("./addInitialData");

app.use(compression());

addDataInDb();

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/get-inital-data/:val", async (req, res) => {
    const { val } = req.params;
    const { rows } = await getSlovos(val);
    res.json(rows);
});

app.get("/get-meaning/:val", async (req, res) => {
    const { val } = req.params;
    const { meaning } = await getMeaning(val);
    res.json(meaning);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, () =>
    console.log("What's it going to be then, eh?")
);
