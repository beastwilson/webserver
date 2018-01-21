const Module = require('../../Module');
const nodeyourmeme = require('nodeyourmeme');

class AlexaModule extends Module {
    constructor() {
        super('alexa');
    }

    register(app, extra) {
        app.get('/alexa/:meme', (req, res) => {
            const meme = req.params.meme;

            nodeyourmeme.search(meme)
                .then((about) => {
                    if (!about) {
                        throw new Error('Invalid response');
                    }

                    res.status(200).json({text: about});
                })
                .catch((e) => {
                    let errorType;
                    if (e.toString().toLowerCase().contains('no results')) {
                        errorType = 'no_results';
                    }

                    res.status(500).json({error: e.toString(), errorType });
                });
        });

        app.get('/alexa/random', (req, res) => {
            nodeyourmeme.random()
                .then((about) => {
                    if (!about) {
                        throw new Error('Invalid response');
                    }

                    res.status(200).json({text: about});
                })
                .catch((e) => {
                    res.status(500).json({error: e.toString()});
                });
        });
    }
}

module.exports = new AlexaModule();