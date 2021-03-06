const mongoose = require('mongoose');

let dbConnectParams = require(`${__path.config}/database`).dbConnectParams;
mongoose.connect(__helper.strFormat(dbConnectParams.url, dbConnectParams.username, dbConnectParams.password, dbConnectParams.db), {
useNewUrlParser: true,
useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
console.log('db connected ==||=========>>\n');
});