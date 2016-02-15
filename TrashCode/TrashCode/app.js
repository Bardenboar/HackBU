/*
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var fs = require('fs');
var http = require('http');
var path = require('path');
var app = express();
var multer = require('multer');
var async = require('async');
var analCode = require('./analCode.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.multipart());
app.use(app.router);
app.use(multer({ dest: './uploads/' }))
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

app.post('/junk', function (req, res) {
    var path = req.files.file.ws.path;
    
    var fileName = req.files.file.name;
    
    var StoringFileNames = './uploads/' + fileName;
    fs.createReadStream(path).pipe(fs.createWriteStream(StoringFileNames));
    
    
    var detect = require('language-detect');
    
    var lang = detect.sync("./uploads/Model.java");
    
    
    var hljs = require('highlight.js');
    
    // lang = process.argv[3],
    data = fs.readFileSync(StoringFileNames);
    var code = data.toString();
    
    async.waterfall([
        function (callback) {
        
            var strng = "<link rel=" + "stylesheet" + "href=" + "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/default.min.css" + ">" +
"<script src=" + "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js" + "></script>" 
        + "        < pre class=\"hljs\"><code class=\"" + lang + "\">" 
               + hljs.highlight(lang, code).value 
               + "</code></pre>";
            callback(null, strng);
        }
    ], function (error, result) {
        res.end(result);
    });
    
    //console.log(strng);
    
   
    
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
