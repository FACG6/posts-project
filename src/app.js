const express = require('express');
const { join } = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const { router } = require('./controllers/index');
const helpers = require('./views/helpers/index');
require('dotenv').config();

const app = express();
app.disable('x-powered-by');
app.use(expressValidator());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));
app.set('port', process.env.PORT || 5555);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
  extname: 'hbs',
  layoutsDir: join(__dirname, 'views', 'layouts'),
  partialsDir: join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
  helpers,
}));
app.use(router);
app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
});

module.exports = app;
