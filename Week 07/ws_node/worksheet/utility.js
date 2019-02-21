function add(a,b) { return a+b; }
function compare(cArray1, cArray2) { return cArray1.toString() === cArray2.toString(); }
function largest(array) { return Math.max(...array) }

module.exports = {
    add: add(),
    compare: compare(),
    largest: largest()
};