const express = require("express");

const db = require("../data/dbConfig.js");

const Router = require('../router/router.js')

const server = express();

server.use(express.json());

server.use('/api/accounts', Router)

server.get('/', (req, res)=>{
    res.status(200).json({ api: "up"})
})

module.exports = server;
