$(function(){
    // 个人中心规则验证
var form = layui.form;
   form.verify({
        nickname:function(value){
            if(value.length>6){
                return "昵称长度必须在1到6位之间";
            }
        }
    })

var layer=layui.layer;
// 调用渲染信息的函数  
    initeUserInfo();

    // ====个人信息提交按钮
$(".layui-form").on("submit",function(e){
    console.log("事件触发成功");
    // 阻止默认提交行为
   e.preventDefault();
    // 发去ajax数据请求
    $.ajax({
        method:"POST",  
        url:"/my/userinfo",
        data:$(this).serialize(),
        success:function(res){
       
            if(res.status!==0){
                return layer.msg("更新信息失败");
            }
            layer.msg("更新信息成功");
        //    在当前窗口调用浏览器当中的方法
            window.parent.getuserinfo();
        }
    })


})

// ======重置表单的数据
$("#btnReset").on("click",function(e){
    // 阻止重置行为
   e.preventDefault();
    // 重新调用form.val（）重新对数据进行渲染一次
    initeUserInfo();


});













 // 初始化用户的个人信息
 function initeUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        success:function(res){
            if(res.status!==0){
                return layer.msg("获取用户信息失败");
            }
            // 快速为表单赋值调用form.val()
    // html结构当中要为表单添加lay-filter这个元素
    {/* <form class="layui-form" lay-filter="formUserInfo"> */}
    // 第一个参数表示要为那个表单赋值，第二个参数表示要用的数据对象
                // console.log(res.data);
            form.val("formUserInfo",res.data);

        
        }
    })
}


// ==========
})
 