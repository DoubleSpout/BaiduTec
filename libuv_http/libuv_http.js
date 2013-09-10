var express = require('express');
var app = express();
var libuv_thread =  require('./build/Release/libuvHttp').libuv_thread
//加载c++的方法都要从./build/Release开始
app.get('/', function(req, res){
  var n = ~~req.query.n || 1;
  var r = libuv_thread(n, function(err, result){
  //调用c++暴露的libuv_thread方法
  	  if(err) return res.send(500)
  	  res.send(result.toString());
  })
  if(r<0) return res.send(500);
  //当线程创建失败，r返回小于0
});
app.listen(8124);





