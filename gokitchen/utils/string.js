module.exports = {
    stringify: function(n) {
        var o = [];
        for (var e in n) o.push(encodeURIComponent(e) + "=" + encodeURIComponent(n[e]));
        return o.join("&");
    },
    parse: function() {}
};