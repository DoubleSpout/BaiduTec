#ifndef ASYN_H
#define ASYN_H
#include <node.h>

using namespace v8;
class LibuvThread {
 public:
  static Handle<Value> libuv_thread(const Arguments& args);
  //对js暴露执行的方法
  static void thread_callback(uv_work_t * req);
  //线程执行的方法
  static void uv_close_func(uv_work_t * req, int status);
  //线程方法结束回调主线程
  LibuvThread(){};
  ~LibuvThread(){};
};
#endif