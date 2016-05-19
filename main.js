console.log('\nLoading...');

var bodyParser      = require('body-parser'),
    express         = require('express'),
    parseUrlencoded = require('urlencoded-request-parser'),
    path            = require('path'),
    serveStatic     = require('serve-static'),
    sessions        = require("client-sessions"),
    fs              = require ('fs-plus');

var DataLayer       = require('./data/DataLayer'),
    WSLayer         = require('./ws/WSLayer'),
    AppLayer        = require('./app/AppLayer');

//global
SERVICE_ROUTE        = "http://192.168.0.6"//"http://localhost";
SERVICE_PORT         = 3001;
SERVICE_AUDIENCE     = SERVICE_ROUTE + ":" + SERVICE_PORT;

APP_ROUTE           = "http://192.168.0.6"//"http://localhost";
APP_PORT            = 80;
APP_AUDIENCE        = APP_ROUTE + ":" + APP_PORT;

var server          = express();

//support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//enable cors
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", SERVICE_AUDIENCE);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var dataLayer = DataLayer();
var wsLayer   = WSLayer(dataLayer,server,sessions);
var appLayer  = AppLayer(server,path,serveStatic);

//run
server.listen(APP_PORT, function () {
  console.log('\nApp server listening');
  console.log('WS Audience: '+SERVICE_AUDIENCE);
  console.log('App Audience: '+APP_AUDIENCE);
});
