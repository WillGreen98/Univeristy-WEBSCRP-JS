'use strict';

let _ = require('underscore')._;

function range(array) {
    return _.max(array) - _.min(array);
}

module.exports = {
    range: range()
};