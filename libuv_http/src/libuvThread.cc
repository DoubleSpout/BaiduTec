#include <node.h>
#include <uv.h>
#include <string>
#include <iostream>
#include "libuvThread.h"
#include "job.h"
using namespace v8;
Handle<Value> LibuvThread::libuv_thread(const Arguments& args) {
  HandleScope scope; 
  Job *jobPtr = new Job();//实例化Job
  jobPtr->fiboNum = (int) args[0]->Int32Value();//获得js传递的n
  jobPtr->jsCallback = Persistent<Object>::New(args[1]->ToObject());
  //这里必须在堆上创建js回调，因为这里需要异步返回
  jobPtr->workT.data = jobPtr;//将job指针赋值到workT.data
  int r = uv_queue_work(uv_default_loop(), &jobPtr->workT, 
  	thread_callback, uv_close_func);//将workT丢入异步线程池
  if(r < 0){//如果线程创建失败，回收内存
  	jobPtr->jsCallback.Dispose();
  	delete jobPtr;
  }
  return scope.Close(Number::New(r));//将线程创建结果返回js
}





void LibuvThread::thread_callback(uv_work_t* req){
  //在线程中
  Job *jobPtr = (Job *) req->data;
  //得到之前创建的job指针
  jobPtr->fiboResult =  Job::fibo(jobPtr->fiboNum);
  //将fiboNum丢入计算
}
void LibuvThread::uv_close_func(uv_work_t *req, int status){
	//线程执行完毕回到主线程
	HandleScope scope;	
	Job* jobPtr= (Job *) req->data;
	Local<Value> argv[2];//创建一个数组，用来给js回调传参
	argv[0] = Local<Value>::New(Null());
	//这边省略了出错的情况，如果出错，第一个参数err要赋值，这边赋null
	argv[1] = Number::New(jobPtr->fiboResult);
	//将斐波那契计算结果作为第二个参数传递给js回调
	jobPtr->jsCallback->CallAsFunction(Object::New(), 2, argv);
	//执行js回调函数，传入参数
	jobPtr->jsCallback.Dispose();//内存回收
	delete jobPtr;
    scope.Close(Undefined());
}

