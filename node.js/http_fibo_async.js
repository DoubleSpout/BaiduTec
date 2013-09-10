var express = require('express');
var app = express();
var fibo = function fibo (n) {
   return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}
app.get('/', function(req, res){
	setImmediate(function(req,res){
		//v0.10.x之后写入事件循环不再使用process.nextTick
		var n = fibo(~~req.query.n || 1);
	  	res.send(n.toString());
	},req,res)
});
app.listen(8124);





