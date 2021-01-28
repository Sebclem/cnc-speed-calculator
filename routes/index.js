var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize')

/* GET home page. */
router.get('/', function (req, res, next) {
    sequelize.models.preset_cut.findAll({ order: ['name'] }).then((preset_cut) => {
        sequelize.models.preset_step_down_factor.findAll({ order: ['name'] }).then((step_down_factor) => {
            res.render('index', { preset_cut: preset_cut, step_down_factor: step_down_factor });
        })
    })

});

module.exports = router;
