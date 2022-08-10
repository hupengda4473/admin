var privateToolsJS = function () {
    let _array = function () {
        /**
         * 数组排序（针对对象中的某个键）（一层）
         * */
        let arrayJsonSortFromSmallToBig_first = function (array, name) {
            function creatJsonSort(key) {
                return function (object1, object2) {
                    let value1 = null;
                    let value2 = null;
                    if (parseInt(object1[key])) {
                        value1 = parseInt(object1[key]);
                    }
                    if (parseInt(object2[key])) {
                        value2 = parseInt(object2[key]);
                    }
                    if (value1 < value2) {
                        return -1;
                    } else if (value1 > value2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }

            array.sort(creatJsonSort(name));
        };
        /**
         * 数组排序（针对对象中的某个键）（两层）
         * */
        let arrayJsonSortFromSmallToBig_second = function (array, name1, name2) {
            function creatJsonSort(key1, key2) {
                return function (object1, object2) {
                    let value1 = null;
                    let value2 = null;
                    if (parseInt(object1[key1][key2])) {
                        value1 = parseInt(object1[key1][key2]);
                    }
                    if (parseInt(object2[key1][key2])) {
                        value2 = parseInt(object2[key1][key2]);
                    }
                    if (value1 < value2) {
                        return -1;
                    } else if (value1 > value2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            array.sort(creatJsonSort(name1, name2));
        };
        /**
         * 数组去重
         * */
        let arrayDeDuplication = function  (arr) {
            return ([...new Set(arr)])
        }
        return {
            /**
             * 数组排序（针对对象中的某个键）
             * */
            arrayJsonSortFromSmallToBig_first: function (array, key) {
                arrayJsonSortFromSmallToBig_first(array, key);
            },
            /**
             * 数组排序（针对对象中的某个键）（两层）
             * */
            arrayJsonSortFromSmallToBig_second: function (array, key1, key2) {
                arrayJsonSortFromSmallToBig_second(array, key1, key2);
            },
            /**
             * 数组去重
             * */
            arrayDeDuplication: function (arr) {
                arrayDeDuplication(arr);
            },
        }
    }();
    let _time = function () {
        Date.prototype.format = function (fmt) {
            let o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        /*console.log(new Date(1606379756309).format("yyyy-MM-dd hh:mm:ss"))
        console.log(new Date(1606379756309).format("yyyy-M-d h:m:s.S"))
        console.log(new Date(1606379756309).format("yyyy年M月d日 h时m分秒.S"))*/
        return {}
    }();
    return {
        array: _array,
        time: _time
    }
}();