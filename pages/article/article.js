// article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {}
  },

  getDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        const r = res.data.result;
        const t = new Date(r.date);
        r.date = `${t.getFullYear()}-${t.getMonth()}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
        r.source = r.source || '默认来源';
        this.setData({
          detail: res.data.result
        });
      },
      fail: err => {
        console.error('获取新闻详情：', err);
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.getDetail();
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})