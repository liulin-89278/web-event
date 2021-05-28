// 每次调用ajax发送请求的时候都会调用这个函数
$.ajaxPrefilter(function(options){
// 在ajax之前统一拼接请求的根路径
options.url="http://api-breakingnews-web.itheima.net"+options.url;
})