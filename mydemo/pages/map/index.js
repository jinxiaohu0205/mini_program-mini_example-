Page({
  data: {
    compass:true,
    latitude: 23.111112,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath: "/image/hong.png",
      name: 'T.I.T 创意园',
      width:55,
      height:62
    },
      {
        id: 2,
        latitude: 23.111112,
        longitude: 113.324520,
        iconPath: "/image/hong.png",
        name: 'T.I.T 清华园',
        width: 55,
        height: 62
      }],
    controls: [{
      id: 1,
      iconPath: '/image/dingwei4.png',
      position: {
        left: wx.getSystemInfoSync().windowWidth/2 -11,
        top: wx.getSystemInfoSync().windowHeight/2 -45,
        width: 20,
        height: 33
      },
      clickable: true
    }],
    circles: [
      {
        latitude: 30.5491861989,
        longitude: 104.0680165911,
        radius: 300
      }
    ],
    polyline: [{
      //按顺序设置点
      points: [
        { longitude: 104.0680165911, latitude: 30.5491861989 },
        { longitude: 104.0687752749, latitude: 30.5493485980 },
        { longitude: 104.0688698344, latitude: 30.5470634483 },
        { longitude: 104.0568588833, latitude: 30.5468832218 }
      ],
      color: "#000ffDD",
      width: 2,
      dottedLine: true
    }],
    hidden:false
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');

    this.animation = wx.createAnimation()
    this.animation.scale(0).step()
    this.setData({ animation: this.animation.export() })
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  },
  bindregionchange(){
    console.log('视野发生变化!');
  },
  bindmarkertap(e){
    console.log('地图标记点的点击事件!');
    console.log(e);
    this.setData({
      hidden:true
    })
    this.animation.scale(1).step({ duration: 200 })
    this.setData({ animation: this.animation.export() })
  },
  close(){
    this.setData({
      hidden: false
    })
  },
  kai(){
    console.log("kai");
  },
  bindcontroltap(){
    console.log('定位点的点击事件')
  }
})
