#include <node.h>
#include "libuvThread.h"
using namespace v8;
void Init(Handle<Object> target) {
  //target是返回给js的object对象
  target->Set(String::NewSymbol("libuv_thread"),
  //命名libuv_thread方法暴露给js调用
  FunctionTemplate::New(LibuvThread::libuv_thread)->GetFunction());
  //libuv_thread调用真正执行的是LibuvThread::libuv_thread
}
NODE_MODULE(libuvHttp, Init)
//调用绑定方法，将Init和 libuvHttp 绑定起来
//注意这里的libuvHttp必须和binding.gyp中target_name相同
//#define NODE_MODULE(modname, regfunc)
//node.h #Line 223