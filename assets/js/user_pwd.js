$(function(){
        var form = layui.form;
        // 校验规则
        form.verify({
            pwd:[/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格！！！"],

            samePwd:function(value){
                if(value===$('[name=oldpwd]').val()){
                        return "新密码不能和旧密码一致"
                }
            },
            rePwd:function(value){
                if(value!==$('[name=newpwd]').val()){
                    return "两次输入的密码不一致"
            }
            }
            
        })
// 按钮的提交和重置
// 获取提示的对象
var layer = layui.layer;
// 出现跨域的问题
$(".layui-form").on("submit",function(e){
    console.log("事件绑定成功");
    e.preventDefault();
    $.ajax({
        method:"POST",
        url:"/my/updatepwd",
        data:$(this).serialize(),
        success:function(res){
            console.log(res);
                if(res.status!==0){
                    return layer.msg("更新密码失败")
                }
                layer.msg("更新密码成功");
                // 更改密码之后重置表单
                $(".layui-form")[0].reset();
        }
    })

})







})