var detect = require('language-detect');

var lang = detect.sync("./uploads/Model.java");

const fs = require('fs'),  
    hljs = require('highlight.js');
   // lang = process.argv[3],
data = fs.readFileSync("./uploads/Model.java");
var code = data.toString();

console.log("<pre class=\"hljs\"><code class=\"" + lang + "\">" 
               + hljs.highlight(lang, code).value 
               + "</code></pre>");
   