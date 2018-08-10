const nodegeocoder = require('node-geocoder');

let geocoder = null;

const init = (config) => {
    geocoder = nodegeocoder(config);
};

const geocode = (address) => {
    return geocoder.geocode(address);
};

module.exports = {
    init: init,
    geocode: geocode
};
