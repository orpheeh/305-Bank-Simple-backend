"use strict";

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./app/routes");
const { port, db } = require("./config/config");

const http = require("http");

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

mongoose.connect(db).then((db) => {
    console.log(`Connected to the database`);


    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));

    routes(app, db);

    http.createServer(app).listen(port, () => {
        console.log(`Express http server listening on port ${port}`);
    });

}).catch((reason) => {
    console.log(reason);
    process.exit(1);
});