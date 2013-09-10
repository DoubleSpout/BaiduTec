var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
	var express = require('express');
	var app = express();
	var fibo = function fibo (n) {
	   return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
	}
	app.get('/', function(req, res){
	  var n = fibo(~~req.query.n || 1);
	  res.send(n.toString());
	});
	app.listen(8124);
	console.log('listen on 8124');
}





