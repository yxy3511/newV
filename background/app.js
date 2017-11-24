var express = require('express');
var path = require('path');
var debug = require('debug')('data_collect');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

var page= require('./routes/page');
var upload = require('./routes/upload')
var proList = require('./routes/proList')
var login = require('./routes/login')
var aboutUSEdit = require('./routes/editAboutUs')
// var mongodb=require('mongodb');
//以下代码顺序很重要
var session = require('express-session');
var app = express();
app.use(cookieParser('yxy3511'));
app.use(session({
    secrect: 'yxy3511',
    resave: false, 
    saveUninitialized: false 
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env', 'production');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/manage/?',function(req, res, next) {
    var url = req.originalUrl;
    if (!req.session.isLogged) {
        return res.render('login',{msg:'请先登录！'})
    }else{
        next();
    }
})
/*--------touter--------------*/
app.use('/manage',proList)
app.use('/',page)
app.use('/manage',upload)
app.use('/manage',aboutUSEdit)
app.use('/',login)

// app.set('port', process.env.PORT || 8300);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('404');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: 'Error',
        error: err
    });
    
});

// connect to the database
// mongoose.connect('mongodb://localhost/data_collect');
app.set('port', 3000);
// app.set('port', 8080);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
