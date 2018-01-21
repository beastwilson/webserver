const express = require('express');
const app = express();

require('./modules/')(app);

app.use((req, res) => {
    res.sendFile(`${__dirname}/static/home/index.html`);
});

app.listen(80, () => {
    console.log('Webserver now listening on port 80!');
});