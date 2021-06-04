// 每次调用ajax发送请求的时候都会调用这个函数
$.ajaxPrefilter(function(options){
// 在ajax之前统一拼接请求的根路径
options.url="http://api-breakingnews-web.itheima.net"+options.url;
// 统一为有权限的接口设置headers请求头
// 注意只有请求路径当中包含/my的才需要这个headers请求头
// 所以需要进行判断
if(options.url.indexOf("/my/")!==-1){
    options.headers={
        Authorization:localStorage.getItem("token")||''
    }
    
}
// 不管发生的请求成功或者是失败都会调用这个函数
options.complete=function(res){
    // console.log(res);
    // 在res当中可以通过res.responseJSON来得到返回的数据
    if(res.responseJSON.status==1&&res.responseJSON.message=="身份认证失败！"){
        localStorage.removeItem("token"); 
        location.href="/login.html";
    }

}



})