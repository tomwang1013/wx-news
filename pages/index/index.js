// index.js

Page({

  /**
   * 根据当前分类获取新闻列表
   */
  getArticles(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.currCatetoryAbbr
      },
      success: res => {
        this.setData({
          articles: res.data.result.map(r => {
            const t = new Date(r.date);
            r.date = t.toLocaleString();
            r.source = r.source || '默认来源';
            return r;
          })
        });
      },
      fail: err => {
        console.error('获取新闻列表失败：', err);
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    // 所有分类
    allCategories: [
      { abbr: 'gn', name: '国内' },
      { abbr: 'gj', name: '国际' },
      { abbr: 'cj', name: '财经' },
      { abbr: 'yl', name: '娱乐' },
      { abbr: 'js', name: '军事' },
      { abbr: 'ty', name: '体育' },
      { abbr: 'other', name: '其他' }
    ],
    currCatetoryAbbr: 'gn',
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticles();
  },

  onTapCategory(e) {
    const tapAbbr = e.currentTarget.dataset.catAbbr;
    if (tapAbbr === this.currCatetoryAbbr) {
      return;
    }

    this.setData({
      currCatetoryAbbr: tapAbbr
    });
    this.getArticles();
  },

  /**
   * 点击进入详情页
   */
  onArticleTap(e) {
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getArticles(() => wx.stopPullDownRefresh());
  }
})