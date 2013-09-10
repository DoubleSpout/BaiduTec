var express = require('express');
var fork = require('child_process').fork;
var app = express();
app.get('/', function(req, res){
  var worker = fork('./work_fibo.js') //创建一个工作进程
  worker.on('message', function(m) {//接受工作进程计算结果
  	if('object' === typeof m && m.type === 'fibo'){
  		 worker.kill();//发送杀死进程的信号
  		 res.send(m.result.toString());//将结果返回客户端
  	}
  });
  worker.send({type:'fibo',num:~~req.query.n || 1});
  //发送给工作进程计算fibo的数量
});
app.listen(8124);





