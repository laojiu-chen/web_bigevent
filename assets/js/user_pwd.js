$(function () {
    // console.log(1);
    var form = layui.form;
    var layer = layui.layer;

    //密码修改的表单验证
    form.verify({
        regPwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        SamePwd: function(value) {
            if(value == $("[name=oldPwd]").val()) {
                return "两次新密码不能与旧密码一样"
            }
        },
        rePwd: function (value) {
            if(value !==$("[name=newPwd]").val()) {
                return "两次密码不一致"
            }
        },
    });

    //修改密码的点击事件
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        // console.log(1);
        $.ajax({
            url:"/my/updatepwd",
            method:"POST",
            data:$(this).serialize(),
            success: function (res) {
                
                if(res.status !== 0) {
                    return layer.msg("修改密码错误！")
                }
                layer.msg("修改密码正确");
                //重置表单
                $(".layui-form")[0].reset();
            }
        })
        
    })
        
})