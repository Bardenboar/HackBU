var detect = require('language-detect');
var lang = detect.sync("C:\\Users\\analjaiswal\\Desktop\\node-mysql-master\\test"+ '/test.js');
console.log(detect.sync("C:\\Users\\analjaiswal\\Desktop\\node-mysql-master\\test"+ '/test.js')); 






const fs = require('fs'),  
    hljs = require('highlight.js')
    file = process.argv[2],
   // lang = process.argv[3],
    data = fs.readFileSync(file);

var code = data.toString();

console.log("<pre class=\"hljs\"><code class=\"" + lang + "\">"  
               + hljs.highlight(lang, code).value 
               + "</code></pre>");
   




    var shorturl = require('shorturl');
    shorturl('http://www.google.com/', function(result) {
    console.log(result);
    });

   // var salt = bcrypt.genSaltSync(10);


    var mysql      = require('mysql');  
    var connection = mysql.createConnection({  
      host     : 'localhost',  
      user     : 'root',  
      password : '',  
      database : 'nodejs_test'  
    });  
    connection.connect();  
      
    connection.query('SELECT * FROM test', function(err, rows, fields)   
    {  
      if (err) throw err;  
      
      console.log(rows);  
    });  
      
    var employee = { ID: '3', Name: 'Shravan' };
    connection.query('INSERT INTO test SET ?', employee, function(err,res){
    if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});
    //connection.end();  

