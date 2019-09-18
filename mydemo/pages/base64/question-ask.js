import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
// import { createQuestion } from '../../services/question.service'
// import config from '../../config'

const wxUploadFile = promisify(wx.uploadFile)

Page({

  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: [],
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },
  openConfirm: function () {
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "主操作",
      cancelText: "辅助操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  onLoad(options) {
    $init(this)
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
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
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

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content
    
    if (title && content) {
      const arr = []
      console.log(this.data.images);
      for (let path of this.data.images) {
        console.log(path)
        let base64 = 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(path, 'base64');
        // let erjin = wx.getFileSystemManager().readFileSync(path, 'binary');
        // console.log(erjin);
        // return false;
        // arr.push(wxUploadFile({
        //   url: 'http://172.16.22.148:8080/zhwts_shop/public/index.php/api/order/uploadimg1',
        //   filePath: path,
        //   name: 'file',
        //   success: function (res) {
        //     console.log(res);
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //     console.log('接口调用失败');
        //   }
        // }))
        wx.request({
          url: 'http://172.16.22.148:8080/zhwts_shop/public/index.php/api/order/upload_img', //仅为示例，并非真实的接口地址
          data: {
            image: base64
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'post',
          success(res) {
            // console.log(res.data);
          }
        })
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