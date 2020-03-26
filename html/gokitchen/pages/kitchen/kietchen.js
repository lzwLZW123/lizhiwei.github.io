// pages/kitchen/kietchen.js
let a = 0, s = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipesLeft: [],
    recipesRight: [],
    offset: 0,
    limit: 20,
    pending: !1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchPopularRecipes()
  },
  tapSearch:function () {
    wx.navigateTo({
      url: "/pages/search/search"
  });
  },
  fetchPopularRecipes: function () {
    let that = this;
    if (!this.data.pending) {
      let data = this.data, pageNum = data.offset, limit = data.limit;
      this.setData({
        pending: !0
      })
      wx.request({
        url: "https://www.xiachufang.com/juno/api/v2/recipes/popular_v3.json",
        method: "GET",
        data: {
          offset: pageNum,
          limit
        },
        success: (res) => {
          console.log(res)
          let content = res.data.content, left = [], right = [];
          content.recipes.forEach(function (e) {
            if ("推广" !== e.reason) {
              delete e.track_info, delete e.recipe.author;
              var tmp = e.recipe.image.original_height / e.recipe.image.original_width + 62 / 167.5;
              a <= s ? (left.push(e), a += that) : (right.push(e), s += that);
            }
          })
          that.setData({
            recipesLeft: that.data.recipesLeft.concat(left),
            recipesRight: that.data.recipesRight.concat(right),
            offset: pageNum + limit
          });
          that.setData({
            pending: !1
          }),
            wx.stopPullDownRefresh();
        }
      })
    }

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
    a = 0, s = 0, this.setData({
      offset: 0,
      recipesLeft: [],
      recipesRight: []
    }),
      this.fetchPopularRecipes()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchPopularRecipes();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})