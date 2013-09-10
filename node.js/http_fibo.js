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





