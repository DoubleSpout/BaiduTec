#ifndef JOB_H
#define JOB_H
#include <node.h>
using namespace v8;
class Job {
  public:
    Persistent<Object> jsCallback;//保存js回调
	uv_work_t workT; //线程传参
	int fiboResult;  //斐波那契执行结果
	int fiboNum;     //斐波那契执行第几个
    static int fibo(int n){
		if(n>1){
			return fibo(n-1) + fibo(n-2);
		}
		else{
			return 1;
		}
	};
    Job():fiboResult(0),fiboNum(0){};
    ~Job(){}; 
};
#endif