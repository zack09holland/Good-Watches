const path = require('path');
const express = require('express');

const { api } = require('./routes');

const app = express();

app.use('/api', api);

app.get('*', (req, res) => {
    console.log(req.path);
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Listening on ' + PORT));