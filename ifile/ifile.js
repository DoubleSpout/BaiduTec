var express = require('express');
var app = express();
var ifile = require("ifile");
app.use(ifile.connect()); 
console.log(__dirname)
//default is [['/static',__dirname]];	
app.listen(3000);