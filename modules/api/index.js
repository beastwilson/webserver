const RouterModuleManager = require('../RouterModuleManager');

class ApiManager extends RouterModuleManager {
    constructor() {
        super('/api', [
            require('./knowyourmeme'),
            require('./tesla')
        ]);
    }
}

module.exports = new ApiManager();