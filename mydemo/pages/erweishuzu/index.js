// pages/erweishuzu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    two_items: [
      {
        id: 0,
        date: '2019年4月18日',
        events: [
          {
            id: 0,
            detail: '吃饭'
          },
          {
            id: 1,
            detail: '学习'
          },
          {
            id: 2,
            detail: '吃饭'
          },
          {
            id: 3,
            detail: '睡觉'
          }
        ]
      },
      {
        id: 1,
        date: '2019年4月19日',
        events: [
          {
            id: 0,
            detail: '吃饭'
          },
          {
            id: 1,
            detail: '学习'
          },
          {
            id: 2,
            detail: '吃饭'
          },
          {
            id: 3,
            detail: '睡觉'
          }
        ]
      },
      {
        id: 2,
        date: '2019年4月20日',
        events: [
          {
            id: 0,
            detail: '吃饭'
          },
          {
            id: 1,
            detail: '学习'
          },
          {
            id: 2,
            detail: '吃饭'
          },
          {
            id: 3,
            detail: '睡觉'
          }
        ]
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  clicked: function (e) {
    var that = this;
    let index = e.currentTarget.dataset.key;//获取index值
    console.log(index);
    that.setData({
      current_item: index
    })
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