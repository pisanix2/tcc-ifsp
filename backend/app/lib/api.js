const controller = require('../controller');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const register = (api, mongodb, geocoder) => {
    router[api.method](api.url, (req, res) => {
        let cnt = controller[api.controller];
        cnt.setMongodb(mongodb);
        cnt.setGeocode(geocoder);
        cnt[api.fn](req, res);
    });
};

const listen = (config) => {
    app.use(config.baseurl, router);
    app.listen(config.port);
};

module.exports = {
    register: register,
    listen: listen
};
