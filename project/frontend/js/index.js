/**
 * 显示等待页
 * */
let showLoadingPage = function () {
  $('body').append('<div class="is_loading_page" style="position: absolute;top: 0;left: 0; width: 100%;height: 100%;z-index: 99999;background: rgba(0,0,0,0);">\
                <div class="loading_box" style="width: 102px;height:22px;position: absolute;top: 50%;left: 50%;margin-top: -17px;margin-left: -51px;overflow: hidden;padding: 6px 12px;box-sizing: content-box;border-radius: 2px !important;background-color: #f0f0f0;">\
                <img src="assets/global/img/loading-spinner-grey.gif">&nbsp;<span>Loading...</span>\
            </div>\
        </div>');
};
/**
 * 关闭等待页
 * */
let hideLoadingPage = function () {
  $('.is_loading_page').remove();
};
/**
 * 统一报错
 * */
let showErrorFunction = function (str) {
  let submitSuccessOrFalse = $('#submitSuccessOrFalse');
  submitSuccessOrFalse.find('.modal-body').html('<h3>' + str + '</h3>');
  submitSuccessOrFalse.modal('show');
};
const indexJS = function () {
  /**
   * 定义变量 开始=============================================================================================
   * */
  /**
   * 定义变量 结束=============================================================================================
   * */
  /**
   * 主要方法 开始=============================================================================================
   * */
  /**
   * 帮点击事件
   * */
  let bindEvent = function () {

  };
  /**
   * 加载首页
   * */
  let showMainPage = function () {
  };
  /**
   * 主要方法 结束=============================================================================================
   * */
  /**
   * 请求数据 开始=============================================================================================
   * */
  /**
   * 获得分类列表
   * */
  let refreshCookingLevelData = function(fun){
    let options             = {};
    showLoadingPage();
    options.successFunction = function (data) {
      hideLoadingPage();
      if(data.error === 0){
        showErrorFunction(data.data[0]);
        if(fun){
          fun();
        }
      }else{
        showErrorFunction(data.errmsg[0])
      }
    };
    OrderingSystem.getCookingLevel(options);
  };
  /**
   * 请求数据 结束=============================================================================================
   * */
  /**
   * 页面刷新 开始=============================================================================================
   * */
  /**
   * 刷新首页分类列表
   * */
  let refreshSortListPage = function () {

  };
  /**
   * 页面刷新 结束=============================================================================================
   * */
  /**
   * 封装方法 开始=============================================================================================
   * */
  /**
   * 封装方法 结束=============================================================================================
   * */
  return {
    init: function () {
      bindEvent();
      showMainPage();
    }
  }
}();