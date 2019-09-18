// pages/guige/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spec:[],
    subIndex:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://mall.sxzhwts.com/api/goods/goods_detail', //仅为示例，并非真实的接口地址
      data: {
        goods_id: '141',
        access_token: 'f4eb0547790631f4c67a392103de8d3208fc0d68'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          spec: res.data.data.spec
        })
        that.jisuan();
      }
    })
  
   
  },
  jisuan:function(e){
    console.log(e);
    var that = this;
    var goods_spec_arr = [];
    var subIndex = that.data.subIndex;
    for (var i = 0; i < that.data.spec.length; i++) {
      goods_spec_arr.push(that.data.spec[i].spec_item[0].id);
      subIndex[i] = '0';
    }
    that.setData({
      subIndex: subIndex
    })
    if(e){
      console.log('走了');
      var index = e.currentTarget.dataset['index'];//外层的下标
      var idx = e.currentTarget.dataset['idx']; //内层的下标
      var subIndex = that.data.subIndex;
      subIndex[index] = idx;
      that.setData({
        subIndex: subIndex
      })
      goods_spec_arr[index] = that.data.spec[index].spec_item[idx].id;
    }
   
    var spec_key = goods_spec_arr.sort(that.sortNumber).join('_'); 
    console.log(spec_key);
  },
  sortNumber: function (a, b) {
    return a - b
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})