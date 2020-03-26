// pages/search/search.js
let a = require("../../utils/mustbe"),
    t = require("../../utils/interopRequireDefault")(require("../../utils/toConsumableArray")),
    s = require("../../utils/myli");
let r = 0, o = !1, n = 0;
let i = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q: "",
    initValue: "",
    recipes: [],
    pending: !1,
    showSearchPop: !1,
    inputMode: !1,
    focus: !1,
    orderBy: "",
    showErrorTip: !1,
    suggestKeywords: [],
    popularKeywords: [],
    searchHistory: [],
    hasMore: !0,
    threshold: 200,
    afterFetch: !1,
    unfold: !0,
    searchScopeData: {
        "@type": "general",
        uniq_id: "search",
        title: "美食菜谱搜索-下厨房",
        digest: "下厨房为你提供百万美食菜谱搜索，让下厨更简单。搜菜式、搜食材，海量视频菜谱，跟着学做菜更快。详细的步骤描述，满满的做菜技巧，让你轻松做出美味的食物。",
        thumbs: [ "http://i2.chuimg.com/a5873feb6713492594f3a78e40c9a916_1600w_1066h.jpg?imageView2/1/w/500/h/500/q/90/format/jpg", "http://i2.chuimg.com/5ac84326873b11e6b87c0242ac110003_3872w_2592h.jpg?imageView2/1/w/500/h/500/interlace/1/q/90", "http://i2.chuimg.com/aa9bcd4c940a11e6a9a10242ac110002_1620w_1080h.jpg?imageView2/1/w/500/h/500/interlace/1/q/90", "http://i1.chuimg.com/61925bd6882d11e6b87c0242ac110003_2835w_1890h.jpg@2o_50sh_1pr_1l_500w_500h_1c_1e_90q_1wh" ],
        tags: [ "菜谱搜索", "家常菜", "早餐", "可乐鸡翅", "红烧肉", "蛋糕", "豆腐", "蛋挞", "面包", "糖醋排骨" ]
    }
  },
  onLoad: function(t) {
    var e = decodeURIComponent(t.q || ""), a = !e;
    this.setData({
        q: e,
        initValue: e,
        hasMore: !0,
        focus: a,
        inputMode: a
    }), r = 0, this.searchInput(), wx.showShareMenu && wx.showShareMenu({
        withShareTicket: !0
    }), this.fetchPopularKeyword();
},
searchKeyword: function(t) {
    this.setData({
        q: t.currentTarget.dataset.keyword
    }), this.searchInput();
},
clearInput: function() {
    this.setData({
        q: "",
        initValue: "",
        focus: !1
    }), this.setData({
        focus: !0
    });
},
exitInputMode: function() {
    getCurrentPages().length > 1 && !this.data.recipes.length ? wx.navigateBack() : this.setData({
        inputMode: !1,
        focus: !1,
        showSearchPop: !1
    });
},
inputChange: function(t) {
    var a = this, s = t.detail.value;
    this.setData({
        q: s
    }), s && "" !== s.trim() && !o && (o = !0, e.keywordSuggest({
        q: s,
        search_type: 1001
    }).then(function(t) {
        t.content && t.content.keywords && a.setData({
            suggestKeywords: t.content.keywords.splice(0, 5)
        });
    }).finally(function() {
        o = !1;
    }));
},
onFocus: function() {
    this.setData({
        showSearchPop: !0,
        inputMode: !0
    });
},
onBlur: function() {
    this.setData({
        showSearchPop: !1
    });
},
searchInput: function(t) {
    var e = this.data.q;
    e && (r = 0, this.setData({
        recipes: [],
        initValue: e,
        q: e,
        hasMore: !0,
        inputMode: !1
    }), this.fetchRecipes(), this.options && (this.options.q = e));
},
searchOrderBy: function(t) {
    var e = t.currentTarget.dataset.type;
    this.data.orderBy !== e && (this.setData({
        orderBy: e,
        recipes: [],
        hasMore: !0
    }), r = 0, this.fetchRecipes());
},
loadMore: function() {
    this.fetchRecipes();
},
fetchPopularKeyword: function() {
    var t = this;
    i.global.popularKeywords ? this.setData({
        popularKeywords: i.global.popularKeywords
    }) : wx.request({
      url:"https://www.xiachufang.com/juno/api/v2/search/keyword_hour.json",
      success:(res)=>{
        console.log(res)
        var a = res.data.content.keywords.slice(0, 20);
        t.setData({
            popularKeywords: a
        }), i.global.popularKeywords = a;
      }
    })
},
fetchRecipes: function() {
    var t = this, a = this.data.q;
    a && !this.data.pending && this.data.hasMore && (0 === r && a && this.saveSearchHistory(a), 
    this.setData({
        pending: !0,
        showErrorTip: !1
    }),
    wx.request({
      url:"https://www.xiachufang.com/juno/api/v2/search/universal_search.json?",
      data:{
        q: a,
        offset: r,
        order_by: this.data.orderBy,
        limit: 20
      },
      success:(res)=>{
        var a = res.data.content.content;
        this.setData({
            recipes: this.data.recipes.concat(a)
        }), 0 === r && this.convertWXScopeDataObj(), a.length > 0 ? r += 20 : this.setData({
            hasMore: !1
        });
        this.setData({
            pending: !1,
            afterFetch: !0
        })
      }
  }))
},
saveSearchHistory: function(t) {
    var e = this;
    this.getSearchHistory(function(a) {
        var s = a.indexOf(t);
        s > -1 && a.splice(s, 1), a.unshift(t), a.length > 6 && (a.length = 6), wx.setStorage({
            key: "search_history",
            data: a
        }), e.setData({
            searchHistory: a
        })
    });
},
onShareAppMessage: function() {
    return {
        title: "下厨房 - ".concat(this.data.q || "菜谱搜索"),
        desc: "看看最近流行的菜谱",
        path: a.getSharePath()
    };
},
onShow: function() {
    var t = this;
    this.getSearchHistory(function(e) {
        t.setData({
            searchHistory: e
        });
    });
},
clearHistory: function() {
    var t = this;
    wx.setStorage({
        key: "search_history",
        data: [],
        success: function() {
            t.setData({
                searchHistory: []
            }), i.global.searchHistory = [];
        }
    });
},
onScroll: function(t) {
    t.detail.deltaY > 0 && t.detail.scrollTop + n + 500 < t.detail.scrollHeight ? this.data.unfold || this.setData({
        unfold: !0
    }) : this.data.unfold && t.detail.scrollTop > 100 && this.setData({
        unfold: !1
    });
},
getSearchHistory: function(t) {
    i.global.searchHistory ? t(i.global.searchHistory) : wx.getStorage({
        key: "search_history",
        complete: function(e) {
            var a = e.data || [];
            i.global.searchHistory = a, t(a);
        }
    });
},
convertWXScopeDataObj: function() {
    var e = this.data.q;
    if (e && !this.data.orderBy && this.data.recipes.length) {
        var i = this.data.recipes.map(function(t) {
            var e = t.content.object;
            return a.picUrl(e.image, 500, 1);
        }).slice(0, 10), r = this.data.recipes.map(function(t) {
            return t.content.object.name;
        }).slice(0, 10), o = "下厨房为您提供".concat(e, "菜谱的做法大全，让你轻松做出好吃的美食。").concat(r.join("、"), "，总有一款适合你！"), n = r.filter(function(t) {
            return t.length <= 10;
        }), c = [].concat((0, t.default)(n), (0, t.default)(s(r.join(" "))));
        c = c.filter(function(t, e) {
            return c.indexOf(t) === e;
        });
        var h = {
            "@type": "general",
            uniq_id: "search_" + e,
            title: "".concat(e, "的做法"),
            digest: o.substr(0, 200),
            thumbs: i,
            tags: c.slice(0, 10)
        };
        this.setData({
            searchScopeData: h
        });
    }
},
searchItemClick: function() {}
})