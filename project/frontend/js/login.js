const loginJS = function () {
  /**
   * 定义变量 开始=============================================================================================
   * */
  /**
   * 定义变量 结束=============================================================================================
   * */
  /**
   * 主要方法 开始=============================================================================================
   * */
  let dataTable = {
    nEditing   : null,
    nNew       : false,
    oTable     : null,
    table      : $('#table_options_dishes_list'),
    handleTable: function () {
      this.oTable = this.table.dataTable({
        stateSave   : true,
        "lengthMenu": [
          [5, 15, 20, -1],
          [5, 15, 20, "全部"] // change per page values here
        ],
        // set the initial value
        "pageLength": 5,

        "language"    : {
          "lengthMenu": " _MENU_ 条每页",
          "sSearch"   : "搜索",
          "sInfo"     : "<i>共</i> _TOTAL_ <i>个</i>  <i>显示</i> _START_ <i>到</i> _END_"

        },
        "columnDefs"  : [
          { // set default column settings
            'orderable': true,
            'targets'  : [0]
          },
          {
            "searchable": true,
            "targets"   : [0]
          }
        ],
        "order"       : [
          [0, "asc"]
        ], // set first column as a default sort by asc
        fnDrawCallback: function () {
          changeLanguage.setLanguage($('#table_options_dishes_list_wrapper'));
          //changeLanguage.setLanguage($('#table_restaurant_list'));
        }
      });
    }
  };
  /**
   * 帮点击事件
   * */
  let bindEvent = function () {
    $('#buttonLoginOk').on('click',function () {
      window.location="index.html";
    });
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
    if (dataTable.oTable) {
      dataTable.oTable.fnDestroy();
    }
    dataTable.handleTable();
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