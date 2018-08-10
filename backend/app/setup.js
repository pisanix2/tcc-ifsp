const config = require('config');
const api = require('./lib/api');
const mongodb = require('./lib/mongodb');
const geocoder = require('./lib/geocoder');

const initDb = () => {
    let cfg = config.get('db');
    return mongodb.connect(cfg);
};

const initApi = () => {
    let cfg = config.get('api');
    let route = cfg.route;
    route = (Array.isArray(route)) ? route : [route];

    route.forEach((el) => {
        api.register(el, mongodb, geocoder);
    });
    api.listen(cfg);
};

const initGeocoder = () => {
    let cfg = config.get('geocoder');
    geocoder.init(cfg);
};

const init = async () => {
    await initDb();
    initGeocoder();
    initApi();
};

module.exports = {
    init: init
};
