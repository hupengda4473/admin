var controlHomePageJS = function () {
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
    //添加图片
    $('.addImage').on('click',function(){
      $('.modalControlBackgroundImageFile').click();
    });
    //清除图片
    $('.clearImage').on('click',function(){
      $("#deleteModal").modal('show');
    });
    //清除图片确认
    $('#deleteModalTrueBtn').on('click',function () {
      let deleteModal = $('#deleteModal');
      deleteModal.modal('hide');
      $('.imageShow').attr('src','');
      console.log('清除图片');
    })
  };
  /**
   * 加载首页
   * */
  let showMainPage = function () {
    initClipBackground();
    $('.imageShow').attr('src','images/demo.jpg');
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
  let initClipBackground = function(){
    $("#modalControlBackgroundImageClipArea").photoClip({
      size: [352, 384],
      outputSize: [704, 768],
      file: ".modalControlBackgroundImageFile",
      view: "",
      ok: ".modalControlBackgroundImageOK",
      loadStart: function() {},
      loadComplete: function() {
        let modalControlBackgroundImage = $('#modalControlBackgroundImage');
        modalControlBackgroundImage.modal('show');
      },
      clipFinish: function(dataURL) {
        let image = new Image();
        image.src = dataURL;
        image.onload = function() {
          let expectWidth = this.naturalWidth;
          let expectHeight = this.naturalHeight;

          if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
            expectWidth = 800;
            expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
          } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
            expectHeight = 1200;
            expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
          }
          //console.log(expectWidth+','+expectHeight);
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          canvas.width = expectWidth;
          canvas.height = expectHeight;
          ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
          //console.log(canvas.width+','+canvas.height);

          let base64 = null;
          let mpImg = new MegaPixImage(image);
          mpImg.render(canvas, {
            maxWidth: 1024,
            maxHeight: 1200,
            quality: 0.8
          });

          base64 = canvas.toDataURL("image/jpeg", 1);

          let modalControlBackgroundImage = $('#modalControlBackgroundImage');
          modalControlBackgroundImage.modal('hide');
          console.log(base64);
        };
      }
    });
  };
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