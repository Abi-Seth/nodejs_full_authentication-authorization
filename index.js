const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const provinceRouter = require('./routers/provinces.router');

require('./models/mongodb');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Rwanda provinces!')
})

app.use('/api/province/', provinceRouter);

const port = process.env.PORT || config.get('application.port');
const password = process.env.DB_PASSWORD;

app.listen(port, () => { 
    console.log(`App running on port ${port}.`) 
});