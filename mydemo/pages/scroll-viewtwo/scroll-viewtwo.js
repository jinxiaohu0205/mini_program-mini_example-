// pages/scroll-viewtwo/scroll-viewtwo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: ['/image/all2.png', '/image/shijian.png'],
    test:'虎'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad',this.data.test);
   
    // wx.navigateTo({
    //   url: '../scroll-view/index',
    // })
    console.group('cuowu de ');
    this.ding = setInterval(function(){
      // console.log('我是定时器');
    },200)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.warn('onReady');
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setStorageSync('type', 1);
    wx.setStorageSync('id', 1);
    var type = wx.getStorageSync('type')
    var id = wx.getStorageSync('id');
    console.log('onShow',type);
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
  onShareAppMessage: function (res) {
    console.log(11);
    // wx.updateShareMenu({
    //   withShareTicket: true,
    //   success() { }
    // })
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  launchAppError(e) {
    console.log(e.detail.errMsg)
  },
  onPageNotFound(res) { 
    wx.switchTab({
      url: 'pages/demo/index'
    }) // 如果是 tabbar 页面，请使用 wx.switchTab
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images =['image/all2.png','image/shijian.png']
    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },
  bindinput(res){
    var that = this;
    console.log(res.detail.value);
    console.log(this.data.test);
    this.setData({
      test:res.detail.value
    })
    console.log(this.data.test);
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})

