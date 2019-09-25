require('dotenv').config();
const createError = require('http-errors'); 
const favicon = require('serve-favicon'); 
const logger = require('morgan');
const path = require('path'); 
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
const DIR = 'assets/images/';
const apiRouter = require('./routes/blogPost.routes.js');
const apiContactRouter = require('./routes/contact.routes.js');
const apiContentRouter = require('./routes/blogContent.routes.js');
const apiCommentRouter = require('./routes/comment.routes.js');
const mongoose = require('mongoose');
process.env.MONGODB_URI = 'mongodb://dhodges351:Sbpkjabb%401@ds127436.mlab.com:27436/heroku_fhp3w022';
var http = require('http');
var debug = require('debug')('ng-dh-nav:server'); 
var port = '3000'; 
app.set('port', port);

/** * Create HTTP server. */ 
var server = http.createServer(app);

/** * Listen on provided port, on all network interfaces. */ 
server.listen(port); server.on('error', onError); 
server.on('listening', onListening);

// mongoose.connect('mongodb://localhost/blogDb',
// { 
//     promiseLibrary: require('bluebird'),
//     useNewUrlParser: true
// }) 
// .then(() => console.log('connection successful')) 
// .catch((err) => console.error(err));

mongoose.connect(process.env.MONGODB_URI,
{ 
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
}) 
.then(() => console.log('connection successful ' + process.env.MONGODB_URI)) 
.catch((err) => console.error(err));
 
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use('/api/comment', apiCommentRouter);
app.use('/api/contact', apiContactRouter);
app.use('/api/blogContent', apiContentRouter);
app.use('/api', apiRouter);

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      //cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
      cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});

app.get('/api', function (req, res) {
  res.end('file catcher example');
}); 
app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});
app.use('/api/upload', router);

// catch 404 and forward to error handler 
app.use(function(req, res, next) 
{ 
    next(createError(404)); 
}); 

// error handler 
app.use(function(err, req, res, next) 
{ 
    // set locals, only providing error in development 
    res.locals.message = err.message; 
    res.locals.error = req.app.get('env') === 'development' 
        ? err : {}; 
        
    // render the error page 
    res.status(err.status || 500); 
    res.sendStatus(err.status); 
});

module.exports = app;


/** * Event listener for HTTP server "error" event. */ 
function onError(error) 
{ 
    if (error.syscall !== 'listen') 
    { 
        throw error; 
    } 
    var bind = typeof port === 'string' 
        ? 'Pipe ' + port 
        : 'Port ' + port; 
        
    // handle specific listen errors with friendly messages 
    switch (error.code) 
    { 
        case 'EACCES': console.error(bind 
            + ' requires elevated privileges'); 
            process.exit(1); 
            break; 
        case 'EADDRINUSE': console.error(bind 
            + ' is already in use'); 
            process.exit(1); 
            break; 
        default: 
        throw error; 
    } 
} 

/** * Event listener for HTTP server "listening" event. */ 
function onListening() 
{ 
    var addr = server.address(); 
    var bind = typeof addr === 'string' 
        ? 'pipe ' + addr 
        : 'port ' + addr.port; 
        debug('Listening on ' + bind); 
}