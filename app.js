var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var watson = require('./routes/watson');
var errands = require('./routes/errands');
var recordings = require('./routes/recordings');
var customers = require('./routes/customers');
var experts = require('./routes/experts');
var alchemy = require('./routes/alchemy');
var klarna = require('./routes/klarna');

var app = express();

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup routes
app.use('/', routes);
app.use('/watson', watson);
app.use('/errands', errands);
app.use('/recordings', recordings);
app.use('/customers', customers);
app.use('/experts', experts);
app.use('/alchemy', alchemy);
app.use('/klarna', klarna);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
