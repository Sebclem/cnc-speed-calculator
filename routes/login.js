const express = require('express');
const router = express.Router();
const passport = require('../config/passport')

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login', {user: req.user});
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        if (req.session.returnTo !== undefined && req.session.returnTo !== null){
            let url = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(url);

        }
        else
            res.redirect('/');
    });

router.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });
module.exports = router;
