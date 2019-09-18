// pages/demo_com/demo_com.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "red"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    com:function(){
      console.log('我是子组件的点击事件');
    }
  }
})
