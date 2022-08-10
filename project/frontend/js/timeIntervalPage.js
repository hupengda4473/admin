var timeIntervalPageJS = function () {
  /**
   * 定义变量 开始=============================================================================================
   * */
  /**
   * 定义变量 结束=============================================================================================
   * */
  /**
   * 主要方法 开始=============================================================================================
   * */
  //首页数据表格
  let dataTable = {
            nEditing: null,
            nNew: false,
            oTable: null,
            table: $('#table_punch_card'),
            handleTable: function () {
              this.oTable = this.table.dataTable({
                stateSave: true,
                "lengthMenu": [
                  [5, 10, 15, 20, -1],
                  [5, 10, 15, 20, "全部"] // change per page values here
                ],
                // set the initial value
                "pageLength": 5,

                "language": {
                  "lengthMenu": " _MENU_ 条每页",
                  "sSearch": "搜索",
                  "sInfo": "<i>共</i> _TOTAL_ <i>个</i>  <i>显示</i> _START_ <i>到</i> _END_"
                },
                "columnDefs": [
                  { // set default column settings
                    'orderable': true,
                    'targets': [0]
                  },
                  {
                    "searchable": true,
                    "targets": [0]
                  }
                ],
                "order": [
                  [0, "asc"]
                ], // set first column as a default sort by asc
                fnDrawCallback: function () {
                }
              });
            }
          };
  /**
   * 绑定击事件
   * */
  let bindEvent = function () {
  };
  /**
   * 加载首页
   * */
  let showMainPage = function () {
    datepicker();//时间区间
    dataTableFun();//dataTable
  };
  /**
   * 主要方法 结束=============================================================================================
   * */
  /**
   * 请求数据 开始=============================================================================================
   * */
  /**
   * 请求数据 结束=============================================================================================
   * */
  /**
   * 页面刷新 开始=============================================================================================
   * */
  /**
   * 页面刷新 结束=============================================================================================
   * */
  /**
   * 封装方法 开始=============================================================================================
   * */
  function datepicker(){
    $('.inputStartTime').datepicker('setDate', new Date().format("yyyy-MM-dd"));
    $('.inputEndTime').datepicker('setDate', new Date().format("yyyy-MM-dd"));
    if (jQuery().datepicker) {
      $('.date-picker').datepicker({
        endDate: "+1d",
        rtl: Metronic.isRTL(),
        orientation: "left",
        autoclose: true
      });
    }
  }
  function dataTableFun(){
    let tbody_punch_card = $('#tbody_punch_card');
    if (dataTable.oTable) {
      dataTable.oTable.fnDestroy();
    }
    // tbody_punch_card.html('');
    dataTable.handleTable();
  }
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