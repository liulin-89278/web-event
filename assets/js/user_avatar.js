$(function(){
    var $image = $("#image");

    const options = {
        aspectRatio:1
        ,
        preview:".img-preview"
    }
$image.cropper(options);




// 为上传按钮添加点击事件
$("#btnChooseImage").on("click",function(e){
    $("#file").click();
})


// 为文件悬着框绑定 change事件
// 选择的文件可以通过事件对象e来获取
var layer = layui.layer;
$("#file").on("change",function (e) {
    // 获取用户选择的文件
    // 在e当中有target属性
    var filelist = e.target.files; 
    if(filelist.length==0){
        return layer.msg("请选择头像文件");
    }
    // 拿到用户选择的文件
    var file = e.target.files[0];
    // 将文件转化为一个url路径
    var newImgUrl = URL.createObjectURL(file);
    // 先销毁旧的裁剪区域的图片，给其重新设置一个url地址，在创建新的裁剪区域
    $image 
        .cropper("destroy")//销毁旧的裁剪区域
        .attr("src",newImgUrl)//重新设置图片路径
        .cropper(options)//重新初始化裁剪区域

  })
// 为确定按钮添加点击事件
$("#btnUpload").on("click",function (e) {
    // 要拿到用户裁剪之后的头像
    var dataURL=$image
                .cropper('getCroppedCanvas',{
                    // 创建一个画布
                    width:100,
                    height:100
                })
                .toDataURL('image/png')//将canvas画布上的内容，转化为base64格式的字符串
                // 调用接口，把头像上传到服务器

        $.ajax({
            method:"POST",
            url:"/my/update/avatar",
            data:{
                avatar:dataURL
            },
            success:function (res) {
                if(res.status!==0){
                    return layer.msg("上传头像失败")
                }
                layer.msg("更换头像成功")
                window.parent.getuserInfo();
              }

        })
  })




    // =====
})