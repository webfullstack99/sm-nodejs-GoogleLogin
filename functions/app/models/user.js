let controller = 'user';
let model = require(`${__path.schemas}/${controller}`);

module.exports = {
    get model() { return model; },
}