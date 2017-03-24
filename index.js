"use strict";

const express    = require("express")
    , bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {

    res.status(200).send("Hola mundo!!")

});

app.post("/login", (req, res) => {

    res.status(200).send(JSON.stringify(req.body));

});

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));