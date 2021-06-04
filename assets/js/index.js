$(function(){
    // 调用获取基本信息的函数
    getuserinfo();
// 点击退出的事件
var layer = layui.layer;
$("#btnLogout").on("click",function(){
        // 提示用户是否退出
        layer.confirm('您确定退出登录吗？', {icon: 3, title:'提示'}, function(index){
       //清空本地存储当中的token
       localStorage.removeItem("token"); 
            //重新跳转到登录页面
            location.href="/login.html";
            // 官方默认的退出提示框
            layer.close(index);

          });


})

})
// 获取用户的基本信息
function getuserinfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg("请求失败");
            }
            // layui.layer.msg("请求成功");
            // console.log(res);
            // 调用渲染的函数对用户的个人信息进行界面的渲染
            renderAvatar(res.data);
        },
        // 无论成功还是失败最后都会调用这个回调函数
        // complete:function(res){
        //     console.log(res);
        //     // 在res当中可以通过res.responseJSON来得到返回的数据
        //     if(res.responseJSON.status==1&&res.responseJSON.message=="身份认证失败！"){
        //         localStorage.removeItem("token"); 
        //         location.href="/login.html";
        //     }

        // }
        


    })
}

// 渲染个人信息的函数
 function renderAvatar(user){
    //  获取用户的名称
     var name = user.nickname||user.username ;
    //  console.log(name);
$("#welcome").html(`欢迎&nbsp&nbsp${name}`);
// 按需渲染用户的头像  
if(user.user_pic!=null){
    // 就渲染图片头像
    $(".layui-nav-img").attr("src",user.user_pic).show();
    $(".text-avater").hide();
}else {
    // 就渲染文字头像
    $(".layui-nav-img").hide();
    // 获取名字的第一个字符
    var first = name[0].toUpperCase();
    $(".text-avater").html(first).show();;





}



}

