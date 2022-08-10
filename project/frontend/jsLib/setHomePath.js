(function () {
    //获得url中参数的方法
    function getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    function in_array(needle, haystack) {
        let i = 0, n = haystack.length;

        for (; i < n; ++i)
            if (haystack[i] === needle)
                return true;

        return false;
    }

    let schema = getQueryString("schema");
    let webTest = !in_array(schema, ["cordova", "electron"]);//web调试
    let ip = "192.168.6.1";
    if (webTest) {
        ip = document.domain;
    }
    let home = "http://" + ip + "/server/";
    if(OrderingSystem.getHomePath_localStorage && OrderingSystem.getHomePath_localStorage()){
        home = OrderingSystem.getHomePath_localStorage();
    }
    OrderingSystem.setHomePath(home);
   /* try{
        if(cloudSystem){
            let home_ = "http://" + ip + "/product/";
            let domainName = "http://ch.ochifan.com/product/server/"; //用于微信分享的链接，要用域名
            if(cloudSystem.getHomePath_localStorage && cloudSystem.getHomePath_localStorage()){
                home_ = cloudSystem.getHomePath_localStorage();
            }
            cloudSystem.setHomePath(home_);
            cloudSystem.setDomainName(domainName);
        }
    }catch (e) {
        console.log(e);
    }*/
})();