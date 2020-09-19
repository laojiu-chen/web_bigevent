$(function () {
    //获取登录用户信息
    getUserInfo();
    //退出点击事件
    $("#exit").on("click", function () {
        // console.log(1);
        localStorage.removeItem("token");
        location.href = "./login.html"
    }) 

})


//获取登录用户的基本信息
function getUserInfo () {
    $.ajax({
        url:"/my/userinfo",
        method:"GET",
        // headers:{
        //     Authorization:localStorage.getItem("token")||""
        // },
        success: function (res) {
            // console.log(res);
            
            if(res.status == 1) {
               return layui.layer.msg("获取用户信息失败!")
            }
            //渲染头像
            randerAvatar(res.data)
        },

       // 进行身份验证，没有token身份不能访问后台页面
        // complete: function (res) {
        //     if(res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！")
        //     {
        //         location.href = "./login.html"
        //     }
            
        // }
    })
}


//渲染头像函数
function randerAvatar(user) {
    // console.log(2);
    //渲染用户名
    // console.log(user);
    
    var name = user.nickname || user.username;
    $("#welcome").html(`<span id="welcome">欢迎&nbsp&nbsp${name}</span>`);
    //渲染头像
    if(user.user_pic) {
        $(".layui-nav-img").attr("src",user.user_pic).show();
        $(".text-avatar").hide()
        

    } else {
        var avatar = name[0].toUpperCase();
        $(".text-avatar").text(avatar).show();
        $(".layui-nav-img").hide();
    }
}