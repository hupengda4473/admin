//必须引用下面的文件
//"ROOT_FOLDER/jsLib/jquery/jquery-2.1.1.js",
//"ROOT_FOLDER/jsLib/jquery/jquery.json.js",
//"ROOT_FOLDER/jsLib/jquery/jquery.ajaxRequest.js"

var OrderingSystem = function () {

    //获得url中参数的方法
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r   = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    function in_array(needle, haystack) {
        var i = 0, n = haystack.length;

        for (; i < n; ++i)
            if (haystack[i] === needle)
                return true;

        return false;
    }

    var schema  = getQueryString("schema");
    var webTest = !in_array(schema, ["cordova", "electron"]);//web调试

    var ip = "192.168.6.1";
    if (webTest) {
        ip = document.domain;
    }

    var home     = "http://" + ip + "/server/";
    var path     = "php/index.php";
    var url      = home + path;
    var language = "";// 设置语言

    var clientTag = getQueryString("client_tag") || "web";

    var debug = false;

    var homeStorageKey     = "OrderingSystemUrlHome";
    var languageStorageKey = "OrderingSystemLanguageCode";

    //请求的开关，默认异步，设置同步请求时只生效一次请求
    var async = true;
    var sync=0    //0时是默认异步，1为同步

    var EARTH_RADIUS = 6378137.0;//单位M
    var PI           = Math.PI;

    var getRad = function (d) {
        return d * PI / 180.0;
    };

    var waiterRoleId = "";

    function info() {
        //URL 请求地址
        var homeStr = localStorage.getItem(homeStorageKey);
        if (homeStr) {
            home = homeStr;
            url  = home + path;
        } else {
            home = "http://" + ip + "/server/";
            url  = home + path;
        }

        // 设置语言
        language = localStorage.getItem(languageStorageKey);
        if (!language) {
            language = "";
        }
    }

    info();


    var errorFunctionRunLevelSettings = null;

    /**
     * 发送请求
     * @param out
     * @param successFunction
     * @param errorFunction
     * @param completeFunction
     */
    var request = function (out, successFunction, errorFunction, completeFunction) {
        //setClientTime();

        out.waiterRoleId = waiterRoleId;
        out.clientTag    = clientTag;

        //记录客户端版本号
        var clientVersion = "old";
        if (this.hasOwnProperty("updateInfo")) {
            if (updateInfo != null) {
                if (updateInfo.hasOwnProperty("version")) {
                    clientVersion = updateInfo.version || "old";
                }
            }
        }
        out.clientVersion = clientVersion;

        var urlStr = url + "?language=" + language;

        if (debug) {
            console.log(urlStr);
        }

        //请求成功
        var success = function (data, textStatus) {
            if (debug) {
                if (data.error) {
                    //alert("error:" + data.error + "errmsg" + data.errmsg[0]);
                    console.error("server logic error:", data, "caused by:", out);
                }
            }

            for (var i in data["cookieData"]) {
                if (data["cookieData"].hasOwnProperty(i)) {
                    localStorage.setItem(i, JSON.stringify(data["cookieData"][i]));
                }
            }

            if (typeof successFunction !== "undefined") {
                successFunction(data, textStatus);
                if (errorFunctionRunLevelSettings) {
                    errorFunctionRunLevelSettings(data, textStatus);
                }
            }
        };

        //请求失败
        var error = function (XMLHttpRequest, textStatus, errorThrown) {
            if (typeof errorFunction === "undefined") {
                if (debug) {
                    console.error(
                        "AjaxRequestError:",
                        "XMLHttpRequest:", XMLHttpRequest,
                        "textStatus:", textStatus,
                        "errorThrown:", errorThrown
                    );
                }
                //pc点餐
                var waitPopupLayer = $(".waitPopupLayer");
                var remind_bottom  = $(".remind_bottom");
                if (waitPopupLayer && remind_bottom && Language) {
                    waitPopupLayer.hide();
                    remind_bottom.html('<span class="language" data-language="Broken_network_remind"></span>');
                    Language.setLanguage();
                    remind_bottom.fadeIn();
                    setTimeout(function () {
                        remind_bottom.fadeOut();
                    }, 1500);
                }
            } else {
                errorFunction(XMLHttpRequest, textStatus, errorThrown);
            }
        };

        //一定会执行
        var complete = function (XMLHttpRequest, textStatus) {
            if (typeof completeFunction === "undefined") {
                if (debug) {
                    console.info(
                        "AjaxRequestComplete:",
                        "XMLHttpRequest:", XMLHttpRequest,
                        "textStatus:", textStatus
                    );
                }
            } else {
                completeFunction(XMLHttpRequest, textStatus);
            }
        };

        var request = new AjaxRequest(urlStr, JSON.stringify(out), success, error, complete);
        request.setAsync(async);
        if(sync==1){
            request.setAsync(false);
        }
        async = true;
        request.doAjax();
        sync=0
    };

    /**
     * 上传文件
     * @param out
     * @param successFunction
     * @param errorFunction
     * @param completeFunction
     */
    var ajaxFileUpload = function (out, successFunction, errorFunction, completeFunction) {
        //请求成功
        var success  = successFunction;
        var error    = function (data, status, e) {
            if (typeof errorFunction === "undefined") {
                if (debug) {
                    console.log(e);
                }
            } else {
                errorFunction(data, status, e);
            }
        };
        var complete = function () {
            $("#loading").hide();
        };

        var beforeSend = function () {
            $("#loading").show();
        };

        // var out = {
        //     "params"    : {},
        //     "controller": "home",
        //     "action"    : "getWindPath"
        // };

        $.ajaxFileUpload(
            {
                //上传处理程序地址
                url          : url + "?controller=" + out.controller + "&action=" + out.action,
                //需要上传的文件域的ID，即<input type="file">的ID
                fileElementId: out.params.fileId,
                //自定义参数。这个东西比较有用，当有数据是与上传的图片相关的时候，这个东西就要用到了
                data         : out.params,
                //是否启用安全提交，默认为false
                secureuri    : false,
                //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断
                dataType     : "application/json",
                //提交成功后自动执行的处理函数，参数data就是服务器返回的数据
                success      : success,
                //提交失败自动执行的处理函数
                error        : error,
                //当要提交自定义参数时，这个参数要设置成post
                complete     : complete,
                beforeSend   : beforeSend
            }
        );
    };

    /**
     * 接口方法
     */
    return {
        /**
         * 设置 HomePath
         * @param urlValue
         */
        setHomePath: function (urlValue) {
            localStorage.setItem(homeStorageKey, urlValue);
            info();
            return true;
        },

        /**
         * 读 HomePath
         */
        getHomePath             : function () {
            return home;
        },
        getHomePath_localStorage: function () {
            return localStorage.getItem(homeStorageKey);
        },

        setRequestAsync: function (value) {
            async = value;
        },

        setLanguage: function (languageCode) {
            localStorage.setItem(languageStorageKey, languageCode);
            language = languageCode;
            return true;
        },

        getWindPath: function (options) {
            var out = {
                "params"    : {},
                "controller": "home",
                "action"    : "getWindPath"
            };
            request(out, options.successFunction, options.errorFunction, options.completeFunction);
        },

        getServerPath: function (options) {
            var out = {
                "params"    : {},
                "controller": "home",
                "action"    : "getServerPath"
            };
            request(out, options.successFunction, options.errorFunction, options.completeFunction);
        },

        /***********************************
         * home
         ***********************************/
        checkTheInternet: function (options) {
            var out = {
                "params"    : {},
                "controller": "home",
                "action"    : "checkTheInternet"
            };
            request(out, options.successFunction, options.errorFunction, options.completeFunction);
        },

        getVersions: function (options) {
            var out = {
                "params"    : {},
                "controller": "home",
                "action"    : "getVersions"
            };
            request(out, options.successFunction, options.errorFunction, options.completeFunction);
        },


        /**
         * 测试数据库延迟
         * @param options
         */
        testDB: function (options) {
            var out = {
                "params"    : {},
                "controller": "home",
                "action"    : "testDB"
            };
            request(out, options.successFunction, options.errorFunction, options.completeFunction);
        },

    }
}();
