$(function () {

    var layer = layui.layer;
    var form = layui.form;

    let cat = localStorage.getItem('Id');
    //发送ajax请求给拿到表单数据

    initEditData();
     function initEditData() {
         $.ajax({
            url: "/my/article/" + cat,
            method: "GET",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("编辑文章失败！")
                }
                // console.log(res);

                form.val('artEditForm', res.data);
               
            }

        });
     }
    
    //初始化富文本
    initEditor();
    
    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    //获取文章列表信息
    initArtist();//初始化列表数据
    //获取文章列表信息
    function initArtist() {
        // console.log(1);

        $.ajax({
            url: "/my/article/cates",
            method: "GET",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取列表数据有误！")
                }
                var ArtList = template("template-List", res);
                // console.log(ArtList);

                $("[name=cate_id]").html(ArtList);
                //快速渲染出列表页面
                form.render();
            }
        })
    };


    //封面图片的更换事件
    $("#btnChange").on("click", function () {
        $("#art_image").click();
        $("#art_image").on("change", function (e) {
            //通过文件框拿到图片
            var file = e.target.files[0];
            //根据选择的文件，创建一个对应的 URL 地址：
            var newImgURL = URL.createObjectURL(file);
            //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        })
    });


    //定义一个变量保存文章的状态
    var art_state = "已发布"
    //点击存为草稿就将art_state的值改为：草稿
    $("#btnSave2").on("click", function () {
        art_state = "草稿";
    })

    //添加表单提交事件
    $("#art_push").on("submit", function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        // console.log(art_state);
        var artForm = new FormData($(this)[0]);
        //将状态添加到artForm里面去
        artForm.append("state", art_state);
        artForm.append("Id", cat);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                artForm.append("cover_img", blob);

                //发送ajax请求发表文章
                $.ajax({
                    url: "/my/article/edit",
                    method: "POST",
                    data: artForm,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        // console.log(res);
                        if (res.status !== 0) {
                            return layer.msg("修改文章失败！"+res.status)
                        }
                        layer.msg("修改文章成功")

                        //清除存在localStorage里面的Id值
                        localStorage.removeItem('Id');
                        location.href = "/article/art_list.html";
                    }
                })
            })
    })

});





