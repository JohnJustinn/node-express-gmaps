const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const  config  = require('./config.js');

let locations = [];
let id = 1;

const server = express();
const PORT = config.port;
const GMAPS_KEY = config.gmaps.key;
const STATUS_USER_ERROR = 422;
const SUCCESS = 200;

server.use(bodyParser.json());

server.post("/place", (req, res) => {
    const { location } = req.body;
    if (!location) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: "User must provide a location" });
        return
    } else {
        const post = { id: id, location }
        id += 1;
        locations.push(location);
        res.status(SUCCESS);
        res.json(location);
    }
});

server.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});