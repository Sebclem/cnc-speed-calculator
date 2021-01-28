var express = require('express');
var router = express.Router();
const passport = require('../config/passport')

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login');
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });
module.exports = router;
