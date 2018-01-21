const ModuleManager = require('./ModuleManager');

const manager = new ModuleManager([
    require('./api/index')
]);

module.exports = function (app) {
    manager.register(app, {});
};


