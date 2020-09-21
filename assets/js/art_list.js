var Edit = null;

$(function () {

    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    //定义一个查询对象，里面包含文章列表页中其他数据
    var p = {
        pagenum: "1",
        pagesize: "2",
        cate_id: "",
        state: "",
    };

    //利用template组件时间过滤器，对时间格式进行美化
    template.defaults.imports.dateFormat = function (date) {
        // console.log(1);
        var dt = new Date(date);
        var y = dt.getFullYear();
        var m = PushZero(dt.getMonth() + 1);
        var d = PushZero(dt.getDate());

        var hh = PushZero(dt.getHours());
        var mm = PushZero(dt.getMinutes());
        var ss = PushZero(dt.getSeconds());

        return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
    }

    //定义一个补零的函数美化时间格式

    function PushZero(value) {
        return value >= 10 ? value : "0" + value;
    }

    //发送ajax请求数据
    initList();
    function initList() {
        $.ajax({
            url: "/my/article/list",
            method: "GET",
            data: p,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取数据失败！" + res.status)
                }
                //将数据用模板渲染在页面上
                randerPage(res.total);
                var htmlstr = template("template-list", res);
                $("tbody").html(htmlstr)

            }
        })
    };


    //给筛选区域添加数据
    initSarch();
    function initSarch() {
        $.ajax({
            url: "/my/article/cates",
            method: "GET",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取数据失败！")
                }
                // console.log(res);

                //利用template拿到将数据添加上去
                var htmlSarch = template("template-search", res);
                $("[name=cate_id]").html(htmlSarch);
                //重新渲染search里面的内容
                form.render();
            }
        })
    };


    //给筛选添加点击功能
    $("#SearchForm").on("submit", function (e) {
        // console.log(1);

        e.preventDefault();
        let cate_id = $("[name=cate_id]").val();
        // console.log(cate_id);

        let state = $("[name=state]").val();
        p.cate_id = cate_id;
        p.state = state;
        //重新渲染list列表的类容
        initList();
    });

    //分页区域渲染

    function randerPage(total) {
        laypage.render({
            elem: 'pages' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total //数据总数，从服务端得到
            , limit: p.pagesize
            , curr: p.pagenum
            , layout: ["count", "limit", 'prev', 'page', 'next', "skip"]
            , limits: [2, 5, 10, 20, 30]
            , jump: function (obj, first) {
                // console.log(obj); 
                p.pagenum = obj.curr;
                p.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    //obj包含了当前分页的所有参数，比如：
                    //得到当前页，以便向服务端请求对应页的数据。

                    // console.log(obj.limit); //得到每页显示的条数
                    initList();
                }
            }
        });

    };

    //删除文章点击事件
    $("tbody").on("click", "#btnDelect", function () {
        // console.log(1);

        // let len = document.querySelectorAll("#btnDelect").length
        var len = $(".btn-Delect").length;
        // console.log(len);

        let id = $(this).attr("data-id");
        // console.log(id);

        //删除弹出层
        layer.confirm('你是否要删除该文章', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: "/my/article/delete/" + id,
                method: "GET",
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg("删除文章失败！")
                    }
                    layer.msg("删除文章成功！");
                    //解决删除时页码出现的问题
                    initList();
                }
            })
            if (len == 1) {
                //删除完当前页码数据后自动让页面减1，如果页码值为1则不减
                p.pagenum = p.pagenum === 1 ? 1 : p.pagenum - 1;
            }
            layer.close(index);
        });
    });


    //文章编辑功能
    $("tbody").on("click", "#btnEdit", function () {
        let id = $(this).attr("data-id");
        localStorage.setItem('Id', id);
        location.href = "/article/art_Edit.html";

        // layer.open({
        //     type: 2, 
        //     content: ['/article/art_pub.html'] //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        //     ,area: ['100%', '100%']
        //   }); 

        
       
        
    })



})

