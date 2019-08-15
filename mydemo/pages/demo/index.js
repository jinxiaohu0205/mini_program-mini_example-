// pages/demo/index.js
var page = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:1,
    newlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    wx.showTabBarRedDot({
      index: 0,
    })
    wx.setTabBarBadge({
      index: 1,
      text: '1'
    })
    wx.setBackgroundColor({
      backgroundColor: 'pink', // 窗口的背景色为白色
    })

    // wx.saveImageToPhotosAlbum({ 
    //   filePath:'/image/all2.png',
    //   success(res){
    //     console.log(res);
    //   }
    // })
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     console.log(latitude, longitude)
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 18
    //     })
    //   },
    //   fail:function(res){
    //     console.log('请打开定位!');
    //     wx.showToast({
    //       title: '请打开定位',
    //       icon: 'warn',

    //     })
    //   }
    // })
    wx.chooseLocation({
      success:function(res){
        console.log(res.name,res.address);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    wx.setBackgroundColor({
      backgroundColorTop: '#ccc', // 顶部窗口的背景色为白色
      backgroundColorBottom: '#ccc', // 底部窗口的背景色为白色
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("用户出发了下拉事件！");

    page = 0;
    this.setData({
      newlist:[]
    })
    this.getViewData();
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触发了上拉加载事件！');
    // 当前页码加一
    page++
    this.getViewData();
    console.log(page);
  },
  getViewData:function(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: 'https://www.apiopen.top/femaleNameApi', //仅为示例，并非真实的接口地址
      data: {
        page: page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if(res.data.data!=null){
          var list = that.data.newlist;
          var newlist = list.concat(res.data.data);
          console.log(newlist);
          that.setData({
            newlist: newlist
          })
        }else{
          wx.showToast({
            title: '没有更多!',
          })
        }
       
      },
      fail: function (res) {
        wx.showToast({
          title: '请求出错请重试',
          success: function (res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      },
      complete: function () {
        wx.hideLoading();
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  //滚动触发
  onPageScroll: function () {
    // Do something when page scroll
    console.log(1);
  },
  //当前是taby页面 点击tab按钮的时候触发
  onTabItemTap:function(){
    console.log(1111);
  },
  bindimg(){
    this.setData({ number: 11 }) // 直接在当前同步流程中执行
    wx.nextTick(() => {
      this.setData({ number: 33 }) // 在当前同步流程结束后，下一个时间片执行
    })
    this.setData({ number: 22 }) // 直接在当前同步流程中执行

  },
 
})