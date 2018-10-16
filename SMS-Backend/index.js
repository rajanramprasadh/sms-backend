const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();
const port = 3000;

const smsEngine = require('./smsEngine.js');

// var mongo = require("mongodb");
// var MongoClient = require("mongodb").MongoClient;

// var url = "mongodb://localhost:27017/";

app.get('/getOrganizations', (req, res) => {
    
    smsEngine.getOrganizations(res);

});

app.post('/getProjects', jsonParser, (req, res) => {

    // console.log(req.headers['content-type']);
    // console.log("Body: " + req.body);
    // res.send(req.body.orgName);
    smsEngine.getProjects(req, res);

});

// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }));

app.listen(port, () => console.log(`Server up and running on port: ${port}`));