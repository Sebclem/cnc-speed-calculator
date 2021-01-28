const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('./config/winston');
const sassMiddleware = require('node-sass-middleware');
const expressWinston = require('express-winston');
const i18n = require('i18n');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

const passport = require('./config/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

i18n.configure({
    // setup some locales - other locales default to en silently
    locales: ['en', 'fr'],
    // where to store json files - defaults to './locales'
    directory: __dirname + '/locales'
});

// Logger
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    level: function (req, res) {
        if (res.statusCode < 500)
            return "debug";
        return "warn";

    }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(sassMiddleware({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     indentedSyntax: false, // true = .sass and false = .scss
//     sourceMap: true,
//     debug: false,
//     response: false,
//     log: function (severity, key, value) { logger.log(severity, `node-sass-middleware   ${key} : ${value}`); }
//
// }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init)

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/', loginRouter);

// Boootstrap JS Files
app.use('/js/bootstrap.min.js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/bootstrap.min.js')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
