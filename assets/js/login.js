$(function () {
    //给跳转标签添加点击事件
    $("#login-a").on("click", function () {
        $(".login-box").hide();
        $(".register-box").show();
    })
    $("#register-a").on("click", function () {
        $(".register-box").hide();
        $(".login-box").show();
    });

    //自定义的表单验证
    var form = layui.form;
    //提示框组件
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],


        regpwd: function (value) {
            var pwd = $(".register-box [name=password]").val()
            if (pwd != value) {
                layer.msg('两次密码输入不同！');
            }
        }
    });


    //表单注册事件
    $("#register-form").on("submit", function (e) {
        e.preventDefault();
        let uname = $(".register-box [name=username]").val().trim();
        let upwd = $(".register-box [name=password]").val().trim();

        $.ajax({
            url: "/api/reguser",
            method: "POST",
            data: {
                username: uname,
                password: upwd,
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('请求失败' + res.message);

                }
                console.log(res.message);
                $("#register-a").click();

            }
        })
    });

    // 登录事件
    $("#login-form").on("submit", function (e) {
        // console.log(1);

        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // console.log(res);

                    return layer.msg('登录失败' + res.status);
                } else {
                    // console.log(res.message);
                    layer.msg("登录成功");

                    //将用于身份区别的tokon值用local Storage保存在本地
                    localStorage.setItem("token", res.token)
                    location.href = "./index.html"
                }

            }
        })
    })

})