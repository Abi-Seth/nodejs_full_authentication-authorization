const mongoose = require('mongoose');
const config = require('config');

const dbName = config.get('dbConfig.name');
const dbPort = config.get('dbConfig.port');

mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Application db connected...');
})
.catch((err) => {
    console.log(err);
})