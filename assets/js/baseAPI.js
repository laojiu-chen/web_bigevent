$.ajaxPrefilter(function (options) {
    //在发起真正的Ajax请求时，统一拼接请求的根路径
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options.url);

    //token身份
    if (options.url.indexOf('/my/') !== -1) {

        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
        // console.log(options.header);

    }

    // 进行身份验证，没有token身份不能访问后台页面
    // console.log(options);
    
    options.complete = function (res) {
        console.log(res);
        
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // console.log(1);
            localStorage.removeItem("token")
            location.href = "./login.html"
        }
    }




})