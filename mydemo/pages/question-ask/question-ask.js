import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
// import { createQuestion } from '../../services/question.service'
// import config from '../../config'
import '../../utils/alert.js'
const wxUploadFile = promisify(wx.uploadFile)

Page({

  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: [],
    jin:{
      title:'jin'
    }
  },

  onLoad(options) {
    
    $init(this)
  },
  clickView: function () {
    console.log("我是template的点击方法");
  },
  demo_co:function(){
    console.log('我是自定义组件')
  },
  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    $digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    $digest(this)
  },

  chooseImage(e) {
    console.log(e);
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        console.log(res);
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },
  van(){
    console.log(1);
  },
  submitForm(e) {
    console.log(1);
    const title = this.data.title
    const content = this.data.content

    if (title && content) {
      const arr = []
      console.log(this.data.images);
      for (let path of this.data.images) {
        console.log(path)
        arr.push(wxUploadFile({
          url: 'https://mall.sxzhwts.com/api/order/uploadReturnGoodsImg',
          filePath: path,
          name: 'image',
          formData: {
            'access_token': '51fb0cf03ae7abd40052ac0f0960bf1a42392908'
          },
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
            console.log('接口调用失败');
          }
        }))

     
      }

      // wx.showLoading({
      //   title: '正在创建...',
      //   mask: true
      // })

      // Promise.all(arr).then(res => {
      //   return res.map(item => JSON.parse(item.data).url)
      // }).catch(err => {
      //   console.log(">>>> upload images error:", err)
      // }).then(urls => {
      //   return createQuestion({
      //     title: title,
      //     content: content,
      //     images: urls
      //   })
      // }).then(res => {
      //   const pages = getCurrentPages();
      //   const currPage = pages[pages.length - 1];
      //   const prevPage = pages[pages.length - 2];

      //   prevPage.data.questions.unshift(res)
      //   $digest(prevPage)

      //   wx.navigateBack()
      // }).catch(err => {
      //   console.log(">>>> create question error:", err)
      // }).then(() => {
      //   wx.hideLoading()
      // })
    }
  }

})