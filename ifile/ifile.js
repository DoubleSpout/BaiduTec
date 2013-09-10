var express = require('express');
var app = express();
var ifile = require("ifile");
app.use(ifile.connect([["/static",__dirname]])); 
//default is [['/static',__dirname]];	
app.listen(3000);