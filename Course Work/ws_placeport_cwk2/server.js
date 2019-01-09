/*
 * UP853829 - WEBSCRP ws_placeport_cwk Server
 * 14 -> 20
 */

'use strict';

const express = require('express');
const imager = require('./imager/imager');

const app = express();
const port = process.env.PORT || 8080;

// Defined in README for "Statistics"
let recent_paths = [];
let recent_sizes = [];
let recent_text = [];
let top_sizes = [];
let top_referrers = [];
let hit_count = [];

// ================= Helper Functions ==================================
/**
 * Formats arrays/ list to display 10 most recent items
 * @param {array} array
 */
let display_formatter_ten = (array) => { if(array.length >= 10) array.splice(10);  return array};

/**
 * Finds and removes any duplicates in an array
 * @param {array} array
 * @param {index} index
 */
let duplicate_finder_remove = (array, index) => {
    for(let i in array) {
        if (array[i] === index) array.splice(i, 1);
    }
    return array;
};

// ================= "Statistics" Arrays Validation Functions ============================
/**
 * Validates the url path
 * @param {Request} req
 */
function validate_recent_paths(req) {
    let query_square = `?square=${req.query.square}`;
    let query_text = `text=${encodeURIComponent(req.query.text)}`;

    // Attempting to use concat on query_query didn't work
    if(isNaN(req.query.square)) query_square = "";
    if(req.query.text === undefined) query_text = "";

    if(isNaN(req.query.square) && (req.query.text !== undefined)) query_text = `?${query_text}`;
    if(!isNaN(req.query.square) && (req.query.text !== undefined)) query_text = `&${query_text}`;

    let url_query = req.path + query_square + query_text;

    if(recent_paths.indexOf(url_query) > -1) recent_paths.splice(recent_paths.indexOf(url_query), 1);
    if(recent_paths.length >= 10) recent_paths.pop();

    recent_paths.unshift(url_query);
}
/**
 * Validates the 10 most recent size array
 * @param {width} width
 * @param {height} height
 */
function validate_recent_sizes(width, height) {
    let recent_size = {"w": parseInt(width), "h": parseInt(height)};

    recent_sizes.forEach((item, index) => {
        if (item.w === recent_size.w && item.h === recent_size.h) {
            recent_sizes.splice(index, 1)
        }
    });

    recent_sizes.unshift(recent_size);
    recent_sizes = display_formatter_ten(recent_sizes);
}

/**
 * Validates the 10 most recent text values
 * @param {text} txt
 */
function validate_recent_txt(txt) {
    if (txt !== undefined) {
        recent_text.forEach((item, index) => {
            if (item === txt) recent_text.splice(index, 1);
        });
    }

    recent_text.unshift(txt);
    recent_text = display_formatter_ten(recent_text);
}

/**
 * Validates all top sizes
 * @param {width} width
 * @param {height} height
 */
function validate_top_sizes(width, height) {
    let seen = false;
    let top_size = {"w": width, "h": height, "n": 1};

    for(const duplicate in top_sizes) {
        if(duplicate.w === width && duplicate.h === height) {
            seen = true;
            duplicate.n += 1;  // Value assigned to primitive is WebStorm getting confused
            break;
        }
    }
    
    if(top_sizes.length >= 10) top_sizes.shift();
    top_sizes.push(top_size);
}

/**
 * Validates all top referrers
 * @param {Request} req
 */
function validate_top_referrers(req) {
    let seen = false;
    let referer = req.get("Referrer");
}

// =========== Routes ============================
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.static(__dirname + "/public"));  // Handles Static Files
app.use("/", (req, res, next) => { console.log(new Date(), req.method, req.url); next(); });  // Aids Debugging

// Defining one route to handle all requests - base URL of W + H can be added to with ?
// No need to define 3 or 4 routes.
// Using async because it seems to suppress or fix a Promise error with imager.sendImage()
app.get("/img/:width/:height", async (req, res) => {
    let width = req.params.width;
    let height = req.params.height;
    let square = req.query.square;
    let text = req.query.text;

    // ==================== Validation ======================================
    // Modulo 1 against 0 is faster than Number.IsInteger calls
    if(width % 1 !== 0 || height % 1 !== 0 || isNaN(width) || isNaN(height)) {
        return res.status(400).send("Numerical input is required.");
    }

    if(width <= 0 || height <= 0) return res.status(400).send("Height and width must be greater than 0.");
    if(width > 2000 || height > 2000) return res.status(403).send("Height and width must be less than 2000.");

    if(square <= Number("0")) return res.status(400).send("Square value must be greater than 0.");

    if(square % 1 === 0) square = parseInt(square);
    else if(square !== undefined) return res.status(400).send("Integer Values");

    // Sending data to Statistic arrays
    validate_recent_paths(req);
    validate_recent_sizes(width, height);
    validate_recent_txt(req);
    validate_top_sizes(width, height);
    validate_top_referrers(req);

    hit_count.push(new Date().getTime());

    // async + await solves ignore Promise return
    await imager.sendImage(res, parseInt(width), parseInt(height), square, text);
});

// ==================== Statistical Routes ===========================================
app.get('/stats', (req, res) => res.sendFile(__dirname + "/public/stats.html"));

// Task Routes
app.get('/stats/paths/recent', (req, res) => res.status(200).send(recent_paths));
app.get('/stats/sizes/recent', (req, res) => res.status(200).send(recent_sizes));
app.get('/stats/texts/recent', (req,res) => res.status(200).send(recent_text));
app.get('/stats/sizes/top', (req,res) => res.status(200).send(top_sizes.sort((item1, item2) => item1.n - item2.n).reverse().slice(0, 10)));
app.get('/stats/referrers/top', (req,res) => res.status(200).send(top_referrers.sort((item1, item2) => item1.n - item2.n).reverse().slice(0, 10)));

// Calculates the time between hits based on a JSON data set
// Current / 1000 = Seconds
app.get("/stats/hits", (req, res) => {
    const dt = Date.now() / 1000;

    // Test.js values
    let hit_seconds = [
        {"title": '5s', "count": 0},
        {"title": '10s', "count": 0},
        {"title": '15s', "count": 0}
    ];

    for(let req_hit in hit_count) {
        if(req_hit > dt - 5) hit_seconds[0].count += 1;
        if(req_hit > dt - 10) hit_seconds[1].count += 1;
        if(req_hit > dt - 15) hit_seconds[2].count += 1;
    }

    res.status(200).send(hit_seconds);
});

// Resets all Statistical data arrays
app.delete("/stats", (req, res, next) => {
    try {
        recent_paths = [];
        recent_sizes = [];
        recent_text = [];
        top_sizes = [];
        top_referrers = [];
        hit_count = [];
    } catch(error) {
        if(error) console.log(next(new Error(error)));
    }

    res.status(200).send("/stats' data deleted.");
});

// ==================== Server Listen =====================================
app.listen(port, function(error, next) {
    if(error) return next(new Error(error));
    else console.log(port, `Express Server @ http://localhost:${port}`);
});