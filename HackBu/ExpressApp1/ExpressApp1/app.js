var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');
var content;
var _password;
var app = express();
const crypto = require('crypto');




//Compressing the Data 
var gzip = zlib.createGzip();
var _compressRstream = fs.createReadStream('./testupload.txt');
var _compressWstream = fs.createWriteStream('./compressed.txt.gz');
_compressRstream
.pipe(gzip)
.pipe(_compressWstream)
.on('finish', function () {
    console.log('done compressing');
    
    //Generate Random Bytes and Convert it into String 
    
    crypto.randomBytes(256, function (err, buf) {
        if (err) throw err;
        _password = buf.toString('hex');
    });
    
    
    //Decompress the Decrypted File
    var gunzip = zlib.createGunzip();
    var _deCompressRstream = fs.createReadStream('./compressed.txt.gz');
    var _deCompressWstream = fs.createWriteStream('./decompressed.txt');
    _deCompressRstream
.pipe(gunzip)
.pipe(_deCompressWstream)
.on('finish', function () {
        console.log('Successfully decompressed');
    });
});
////Encrypting the Compressed file    
//var password = new Buffer('Mysecret'); //Save this password to database??
//var _EncryptCipher = crypto.createCipher('aes-256-cbc', password);
//var _encryptRstream = fs.createReadStream('./testupload.txt');
//var _encryptWstream = fs.createWriteStream('./myfile.encrypted');

//_encryptRstream//reads from textfile
//.pipe(_EncryptCipher)
//.pipe(_encryptWstream)
//.on('finish', function () {  // is finished?
//    console.log('Encrypted Succssfully');
//});

////Decrypting the Compressed File
//var _decryptCipher = crypto.createDecipher('aes-256-cbc', password);
//var _decipherRstream = fs.createReadStream('./myfile.encrypted');
//fs.crea
//var _decipherWstream = fs.createWriteStream('./decrypted.txt');
//_decipherRstream
//    .pipe(_decryptCipher)
//    .pipe(_decipherWstream)
//    .on('finish', function () {  // is finished?
//    console.log('Decrypted Succssfully');
//});
    
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    
    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
    
    app.get('/', routes.index);
    app.get('/users', user.list);
    
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
