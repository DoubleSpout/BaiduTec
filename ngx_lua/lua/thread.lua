local args = ngx.req.get_uri_args();
local n = tonumber(args["n"])
if(not n) then
	n = 1
end
function sleep(n)
    ngx.sleep(n) --休眠线程
end
co = ngx.thread.spawn(sleep, n)
--启动一个线程执行sleep
--ngx_lua是非阻塞，同步的
ngx.say("sleeping "..tostring(n).." sec")
--会在sleep之后响应客户端