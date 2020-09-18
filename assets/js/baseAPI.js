$.ajaxPrefilter(function(options) {
    //在发起真正的Ajax请求时，统一拼接请求的根路径
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options.url);
      

})