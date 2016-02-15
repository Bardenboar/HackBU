var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');
var content;
var _password;
var app = express();
const crypto = require('crypto');

var time = Math.round(new Date().getTime()/1000);
var date = new Date().getDate();

//var datetime=function() { return new Date().getTime(); }
console.log(date +""+ time);
var fname = './' + date + "" + time +'compressed.txt.gz';
//Compressing the Data 
var gzip = zlib.createGzip();
var _compressRstream = fs.createReadStream('./testupload.txt');
var _compressWstream = fs.createWriteStream(fname);
_compressRstream
.pipe(gzip)
.pipe(_compressWstream)
.on('finish', function () {
    console.log('done compressing');


//saving in the database    
var mysql      = require('mysql');  
    var connection = mysql.createConnection({  
      host     : 'localhost',  
      user     : 'root',  
      password : '',  
      database : 'nodejs_test'  
    });  
    connection.connect();  
      
    var employee = {ID:"", filename: fname, location:'./', url_tiny:"", uploadtime: time, deletetime: "", language:"" };
    connection.query('INSERT INTO data SET ?', employee, function(err,res){
    if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});


connection.end(); 
    //Generate Random Bytes and Convert it into String 
    
    crypto.randomBytes(256, function (err, buf) {
        if (err) throw err;
        _password = buf.toString('hex');
    });
 //   var tempfname;
 //   connection.query('SELECT fname FROM test', function(err, rows, fields)   
 //   {  
 //     if (err) throw err;  
 //     tempfname=rows;
//      console.log(rows);  
//    });  
    //Decompress the Decrypted File
    var gunzip = zlib.createGunzip();
    var _deCompressRstream = fs.createReadStream('./' + date + "" + time +'compressed.txt.gz');
    var _deCompressWstream = fs.createWriteStream('./decompressed.txt');
    _deCompressRstream
.pipe(gunzip)
.pipe(_deCompressWstream)
.on('finish', function () {
        console.log('Successfully decompressed');
    });
});

