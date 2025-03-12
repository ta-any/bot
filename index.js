const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use('/auth', router);

app.listen(config.port, () => {
    console.log(`Server is running on port http://localhost:${config.port}/auth`);
});

