var express = require('express');
var router = express.Router();

let controller = 'index';
let viewFolder = `index/pages/${controller}`;
//const userModel = require(`${__path.models}/user`);

// INDEX
router.get('/', async function (req, res, next) {
    
    //let data = await userModel.model.find({});
    //console.log(data);
    res.render(`${viewFolder}/index`, {
        title: 'Express',
        user: req.user,
    });
});

module.exports = router;
