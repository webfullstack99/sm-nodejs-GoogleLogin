let controller = 'user';

const mongoose = require('mongoose');
const database = require(`${__path.config}/database`);
let collectionName = database.collections[controller];
const schema = new mongoose.Schema({
    username: String,
    fullname: String
});
module.exports = mongoose.model(collectionName, schema);