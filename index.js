const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const provinceRouter = require('./routers/provinces.router');
const { application } = require('express');

require('./models/mongodb');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Rwanda provinces!');
})

app.use('/api/province/', provinceRouter);

if(!config.my_jwtPrivateKey) {
    console.error('FATAL ERROR: JwtPrivateKey is not defined!');
    process.exit(-1);
}

if (!config.get(application.port)) {
    console.error('FATAL ERROR: Application port is not defined!');
    process.exit(-1);
}

const port = process.env.PORT || config.get('application.port');
const password = process.env.DB_PASSWORD;

app.listen(port, () => { 
    console.log(`App running on port ${port}.`); 
});