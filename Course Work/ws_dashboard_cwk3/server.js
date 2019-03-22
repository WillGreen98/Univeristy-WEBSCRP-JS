'use strict';

const _ = require("underscore");
const express = require("express");
const winston = require("winston");
const logger = require("./app/lib/logger");
const routes = require("./app/server/routes/router");

const path = require("path");
const favicon = require('serve-favicon');

const app = express();
const router = express.Router();

const port = process.env.PORT || 8080

app.use(router);
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
// app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
// app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
// app.set("view options", { layout: false });

// app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', "./app/public/assets/Icons/favicon.ico")));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))