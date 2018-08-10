const controllers = {};

require('fs').readdirSync('./app/controller').forEach((file) => {
    if (file !== 'index.js') {
        file = file.replace('.js', '');
        controllers[file] = require('./' + file);
    }
});

module.exports = controllers;
