const { Client, Command } =  require('intrepid-api');

const Module = require('../../Module');

class TeslaModule extends Module {
    constructor() {
        super('tesla');

        this.client = new Client(process.env.API_KEY);
    }

    static isValidCommand(cmd) {
        for (const key of Object.keys(Command)) {
            if (Command[key] === cmd) {
                return true;
            }
        }

        return false;
    }

    register(app, extra) {
        app.get('/tesla/:command', (req, res) => {
            const command = req.params.command;

            if (!TeslaModule.isValidCommand(command)) {
                return res.status(400).json({error: 'Invalid command.'});
            }

            this.client.action(command)
                .then(() => {
                    res.status(200).json({text: 'Succesfully ran command ' + command});
                })
                .catch((e) => {
                    res.status(500).json({error: e.toString()});
                });
        });
    }
}

module.exports = new TeslaModule();