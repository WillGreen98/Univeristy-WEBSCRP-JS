'use strict';

import * as _ from 'underscore';

function range(array) {
    return _.max(array) - _.min(array);
}

module.exports = {
    range: range()
};