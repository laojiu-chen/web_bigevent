$(function () {
    
    var form = layui.form;
    var layer = layui.layer;
    //表单验证
    form.verify ({
        nickname: function(value){ //value：表单的值、item：表单的DOM对象
            // layer.msg('sdfds')
            
           if(value.length > 6) {
               return '用户昵称长度要1~6位'
           }
          }
          
    });


    initUserInfo();
    //获取用户信息
    function initUserInfo() {
        $.ajax({
            url:"/my/userinfo",
            method:"GET",
            success: function (res) {
                // console.log(res);
                
                if(res.status !== 0) {
                   return layer.msg("用户信息获取失败！")
                }
                // console.log(res);
                //给表单快速赋值
                form.val('UserInfoForm', res.data);
                
            }
        })
    };

    //重置点击按钮事件
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    });

    //表单的提交事件
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        // console.log(1);
        $.ajax({
            url:"/my/userinfo",
            method:"POST",
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg("修改数据失败！")
                }
                layer.msg("更新用户信息成功")
                window.parent.getUserInfo();
                
            }

        })
        
    })
})