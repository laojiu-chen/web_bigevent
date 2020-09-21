$(function () {

    var layer = layui.layer;
    var form = layui.form;
    //发起ajax请求,渲染页面数据
    randerTable();
    function randerTable() {
        $.ajax({
            url: "/my/article/cates",
            method: "GET",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("表单信息获取失败!")
                }

                let templateHtml = template("template-table", res);
                $("#table-html").html(templateHtml);
            }
        });
    }
    //创造一个变量给close关闭弹出层
    var CloseIndex = null;
    //给添加类别绑定点击事件
    $("#btnVarietyaAdd").on("click", function () {
        CloseIndex = layer.open({
            type: 1,
            title: '添加类别',
            area: ['500px', '250px']
            , content: $("#layer-Add").html()
        });

    });

    //添加表单submit事件
    $("body").on("submit", "#formDataAdd", function (e) {
        // console.log(1);

        e.preventDefault();
        $.ajax({
            url: "/my/article/addcates",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("添加数据失败!")
                }

                randerTable();
                layer.close(CloseIndex);

            }
        })
    });
    //创造一个变量给close关闭弹出层
    var EditIndex = null;
    //编辑的点击事件
    $("#table-html").on("click", "#btnEdit", function () {
        // console.log(1);

        //弹出层
        EditIndex = layer.open({
            type: 1,
            title: '编辑',
            area: ['500px', '250px']
            , content: $("#layer-Edit").html()
        });

        var id = $(this).attr("data-Id");
        // console.log(id);
        //发送ajax请求数据并渲染
        $.ajax({
            url:"/my/article/cates/"+id,
            method:"GET",
            success:function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg("信息错误！")
                }
                //快速给表单赋值
                form.val('setData', res.data);
            }
        })

    });

    //通过事件委托，给表单绑定一个submit事件
    $("body").on("submit","#formDataEdit",function(e) {
        e.preventDefault();
        $.ajax({
            url:"/my/article/updatecate",
            method:"POST",
            data:$("#formDataEdit").serialize(),
            success:function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg("修改数据失败！")
                }
                layer.close(EditIndex);
                randerTable();
            }
        })
    });


    //通过事件委托，给删除绑定点击事件
    $("#table-html").on("click","#btnDelete",function () {
        // console.log(1);
        var id = $(this).attr("data-id");
        $.ajax({
            url:"/my/article/deletecate/"+id,
            method:"GET",
            success:function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg("删除失败！"+res.message)
                }
                randerTable();
            }
        })
        
    })
})