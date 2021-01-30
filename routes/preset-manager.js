const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const { Op } = require("sequelize");
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const isAdmin = require('../middleware/is-admin');
const logger = require('../config/winston');

const preset_cut_tools = require('../tools/preset_cut_tools')

const { body, validationResult, matchedData } = require('express-validator');

/* GET home page. */
router.get('/preset-manager', ensureLoggedIn(), isAdmin, function (req, res, next) {
    sequelize.models.preset_cut.findAll({ order: ['name'] }).then((preset_cut) => {
        sequelize.models.preset_step_down_factor.findAll({ order: ['name'] }).then((step_down_factor) => {
            res.render('preset-manager', {
                preset_cut: preset_cut,
                step_down_factor: step_down_factor,
                user: req.user
            });
        });
    });
});


router.get(
    '/preset-manager/preset-cut/:id',
    ensureLoggedIn(),
    isAdmin,
    function (req, res, next) {
        sequelize.models.preset_cut.findOne({ where: { id: req.params.id } }).then((preset) => {
            if (preset == null) {
                res.status(404);
            } else {
                res.render('preset-cut-editor', { preset: preset, user: req.user });
            }
        }).catch((err) => {
            res.status(500);
        });
    });

router.post(
    '/preset-manager/preset-cut/:id',
    ensureLoggedIn(),
    isAdmin,
    body('name').isString(),
    body('feed_by_tooth_more_1').isFloat({ min: 0 }).toFloat(),
    body('feed_by_tooth_more_2').isFloat({ min: 0 }).toFloat(),
    body('feed_by_tooth_more_3').isFloat({ min: 0 }).toFloat(),
    body('feed_by_tooth_more_4').isFloat({ min: 0 }).toFloat(),
    body('feed_by_tooth_more_5').isFloat({ min: 0 }).toFloat(),
    body('feed_by_tooth_more_6').isFloat({ min: 0 }).toFloat(),
    body('feed_by_tooth_more_8').isFloat({ min: 0 }).toFloat(),
    body('cutting_speed').isInt({ min: 0 }).toInt(),
    function (req, res, next) {

        const errors = validationResult(req);
        const data = matchedData(req);
        if (!errors.isEmpty()) {
            // TODO Handle error
            req.flash('error', 'Error');
            res.redirect(`/preset-manager/preset-cut/${req.params.id}`);
        } else {
            preset_cut_tools.edit(req.params.id, data).then(() => {
                res.redirect('/preset-manager');
            }).catch((reason => {
                if (reason === "NOT_FOUND") {
                    res.status(404);
                } else {
                    logger.error(`Fail to save: Code ${reason}`);
                    res.status(500);
                }
            }));
        }

    });

module.exports = router;
