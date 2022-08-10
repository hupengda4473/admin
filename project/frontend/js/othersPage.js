var othersPageJS = function () {
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
   * 绑定击事件
   * */
  let bindEvent = function () {
    /*展示modal*/
    $('#showModalBtn').on('click',function (){
      let addDineGroupModal = $('#addDineGroupModal');
      addDineGroupModal.find('.dishesInputCountSet span').removeClass('checked');
      addDineGroupModal.find('.dishesInputCountSet label.default').find('span:first').addClass('checked');
      addDineGroupModal.modal('show');
    })

    /*关闭modal*/
    $('.addNewDishesModalTrueBtn').on('click',function () {
      let addDineGroupModal = $('#addDineGroupModal');
      let val = addDineGroupModal.find('.dishesInputCountSet span.checked').closest('label').data('value');
      console.log(val);
      addDineGroupModal.modal('hide');
    })
  };
  /**
   * 加载首页
   * */
  let showMainPage = function () {
    datepicker();//时间区间
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