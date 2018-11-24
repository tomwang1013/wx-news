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
        r.date = t.getHours() + ':' + t.getMinutes();
        this.setData({
          detail: res.data.result
        });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDetail(() => wx.stopPullDownRefresh());
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})