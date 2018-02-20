const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const  config  = require('./config.js');


const server = express();
const PORT = config.port;
const GMAPS_KEY = config.gmaps.apiKey;
const STATUS_USER_ERROR = 422;
const SUCCESS = 200;
const URI_PLACE_SEARCH = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const URI_PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

const query = 'hotels+in+Athens+Georgia';


server.use(bodyParser.json());


server.get('/place', (req, res) => {
    const search = req.query.search;
    const url = URI_PLACE_SEARCH + query + '&key=' + GMAPS_KEY;
    fetch(url)
        .then(search => search.json())
        .then(search => {
            res.status(SUCCESS);
            res.json(search);
        })
            .catch(err => {
                res.status(STATUS_USER_ERROR);
                res.json({ error: err});
            });
});


/*server.post("/place", (req, res) => {
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
});*/

server.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});