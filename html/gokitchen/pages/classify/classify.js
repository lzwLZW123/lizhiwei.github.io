// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [],
    subCat: [],
    subCategories: [],
    scrollTop: 0,
    canUseComponent: true,
    pageScroll: !0,
    pageScrollTop: 0,
    categoryScopeData: {
      "@type": "general",
      uniq_id: "category",
      title: "美食菜谱分类-下厨房",
      digest: "下厨房为你提供丰富的美食菜谱分类。不知道吃什么？看看家常菜、下饭菜、烘焙、肉类、早餐、蔬菜、汤粥主食、快手菜等热门分类。另外还有菜式、场景、食材辅料、趣味分类、文化地标等各种分类，让你轻松发现各种美味。",
      thumbs: ["http://i2.chuimg.com/3a5a1fb96eb747979b2ec35e0cc8989f_1776w_1184h.jpg?imageView2/1/w/500/h/500/interlace/1/q/90", "http://i2.chuimg.com/e5913e2e89eb11e6a9a10242ac110002_800w_533h.jpg?imageView2/1/w/500/h/500/interlace/1/q/90", "http://i1.chuimg.com/2317ff22c57f4e8faf646b7f123c1f4c_1000w_563h.jpg@2o_50sh_1pr_1l_500w_500h_1c_1e_90q_1wh.jpg", "http://i1.chuimg.com/95e921d2a7d447a4857276036bd06c80_5472w_3648h.jpg@2o_50sh_1pr_1l_500w_500h_1c_1e_90q_1wh.jpg"],
      tags: ["菜谱分类", "家常菜", "烘焙", "早餐", "汤粥主食", "下饭菜", "快手菜", "红烧肉", "可乐鸡翅", "糖醋排骨"]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading(),
      wx.getStorage({
        key: "categories",
        success: (e) => {
          console.log(e)
          this.setData({
            categorys: e.data
          }),
            wx.hideNavigationBarLoading();
        }
      })
    if (this.data.categorys.length > 0) {
      return false
    } else {
      wx.request({
        url: "https://www.xiachufang.com/juno/api/v2/categories/tree_plus.json",
        method: "GET",
        success: (res) => {
          this.setData({
            categorys: res.data.content
          }),
            wx.setStorage({
              key: "categories",
              data: res.data.content
            });
          console.log(this.data.categorys)
        }
      })
    }

  },
  openCat: function (e) {
    var t = e.currentTarget.dataset.keyword;
    console.log(e)
    if ("search" === e.currentTarget.dataset.type) wx.navigateTo({
      url: "/pages/search/search?q=".concat(t)
    }); else {
      var a = e.currentTarget.dataset.current.split(",").map(function (e) {
        return Number(e);
      });
      this.setData({
        subCategories: this.data.categorys[a[0]].entries[a[1]].sub_categories
      }), this.openSubcat();
    }
  },
  openSubcat: function() {
    this.data.canUseComponent ? (this.popSubcat.open(), this.setData({
        scrollTop: 0
    })) : this.openDialog();
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.canUseComponent && (this.popSubcat = this.selectComponent("#pop-subcat"));
  },

  enablePageScroll: function() {
    this.setData({
        pageScroll: !0
    }), wx.pageScrollTo({
        scrollTop: this.data.pageScrollTop,
        duration: 0
    });
},
getPageScrollTop: function() {
    var e = this, t = wx.createSelectorQuery();
    t.select("#category-root"), t.selectViewport().scrollOffset(), t.exec(function(t) {
        e.setData({
            pageScrollTop: t[0].scrollTop
        });
    });
}
})