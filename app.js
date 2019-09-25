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
const DIR = './uploads';
const apiRouter = require('./routes/blogPost.routes.js');
const apiContactRouter = require('./routes/contact.routes.js');
const apiContentRouter = require('./routes/blogContent.routes.js');
const apiCommentRouter = require('./routes/comment.routes.js');
const mongoose = require('mongoose'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var debug = require('debug')('ng-dh-nav:server'); 
var http = require('http');
var port = '3000'; 
app.set('port', port);

/** * Create HTTP server. */ 
var server = http.createServer(app);

/** * Listen on provided port, on all network interfaces. */ 
server.listen(port); server.on('error', onError); 
server.on('listening', onListening);

mongoose.connect('mongodb://dhodges351:Sbpkjabb%401@ds127436.mlab.com:27436/heroku_fhp3w022',
{ 
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
}) 
.then(() => console.log('connection successful')) 
.catch((err) => console.error(err));
 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  //res.setHeader('Access-Control-Allow-Origin', 'https://gourmetphilatelist.herokuapp.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use('/api/comment', apiCommentRouter);
app.use('/api/contact', apiContactRouter);
app.use('/api/blogContent', apiContentRouter);
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

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
    res.send(err.status); 
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