'use strict';

const config = require("./config.json");
const mysql = require("mysql2/promise");

const getConnection = function(callback) {
    const connection = mysql.createPool({bodyParser_JSON: config.mysql});
};

async function initConnection() {
    const connection = await getConnection();

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        });
    });

    return connection;
}


async function saveCar(reg, make, model, year, price) {

}

async function getAveragePrice(year) {

}

async function shutdown(database) {
    await database.end();

}

module.exports = {
    saveCar: saveCar,
    getAveragePrice: getAveragePrice
};