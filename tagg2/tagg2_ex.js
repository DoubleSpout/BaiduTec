var express = require('express');
var tagg2 = require("tagg2")
var app = express();
var th_func = function(){//我们在函数里写sleep
  var now = Date.now();
	var obj = {}
  var sec = ~~thread.buffer
  require("./threadRequire.js") //加载一个js文件
  console.log("in the thread")//打印信息
  console.log(__dirname)//打印文件夹路径
  while(Date.now() - now < sec*1000){}//sleep 线程 sec 秒  
  obj.n = sec
  thread.end(obj)//返回给主线程一个对象
}
app.get('/', function(req, res){
  var n = ~~req.query.n || 1;
  var buf = new Buffer(n.toString());
  if(n>10){//传入参数n大于10，就创建线程
      var pool1 = tagg2.create({poolsize:10,dirname:__dirname,fastthread:true})
      pool1.pool(th_func, buf, function(err,result){
            if(err) res.end(err);
            res.send("create thread n:"+result.n.toString());
         })
  }
  else res.send("not create thread n:"+n.toString())
});
app.listen(8124);
