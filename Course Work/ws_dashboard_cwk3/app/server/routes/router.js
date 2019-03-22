'use strict';

const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
   console.log(req.method, req.url);
   next();
});

router.get('/', function(req, res) {
    // res.render("../../public/views/index.html")
    res.render("Hello!")
});

module.exports = router;