$(function(){
    // 点击去注册的链接
    $("#link-reg").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show();
       


    });
    // 点击去登陆的链接

    $("#link-login").on("click",function(){
        $(".reg-box").hide();
        $(".login-box").show();
    });

// 导出提示
var layer = layui.layer;
// 从layui当中获取form
var form = layui.form;
// 通过form.verify来自定义校验规则
form.verify({
    // 自定义一个叫做pwd的校验规则
    pwd:[/^[\S]{6,12}$/,"密码必须6到12位,且不能出现空格"],
// 校验两次输入密码的值是否相等的自定义校验
    repwd:function(value){
        // 通过形参拿到的是确认密码框当中的内容
        // 还需要拿到密码框当中的内容
        // 然后进行等于的校验，如果失败则返回错误提示
        var pwd = $('.reg-box [name=password]').val();
        if(pwd!=value){
            // $('.reg-box [name=repassword]').val(""); 
            return "两次输入的密码不一致！！！"
        }
    }
});

// 监听注册表单的提交事件
$("#form_reg").on("submit",function(e){
    e.preventDefault();
    $.post("/api/reguser",{
        username:$("#form_reg [name=username]").val(),
        password:$("#form_reg [name=password]").val()
    },function(res){
        console.log(res);           
    if(res.status!==0){
                    layer.msg(res.message);
                }
                layer.msg(res.message);
                // 模拟点击事件返回登录界面
                $("#link-login").click();
    })


})

// 监听登录表单的提交事件

$("#form_login").on("submit",function(e){
    e.preventDefault();
    $.ajax({
        url:"/api/login",
        method:"POST",
        // jquery封装的快速获取表单对象的数据
        data:$(this).serialize(),
        success:function(res){
            console.log(res);
                if(res.status!==0){
                    return layer.msg("登录失败")
                }
                // 权限身份验证
                console.log(res.token)
                // 将登录成功后的token字符串保存到localstorage里面
                localStorage.setItem('token',res.token);
                layer.msg("登录成功");
                // 跳转到后台主页
                // location.href="/index.html";
        }
    })


})



















})


















































