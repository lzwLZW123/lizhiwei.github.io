var r = require("./string");
module.exports = {
    picUrl: function(r) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 640, 
            t = arguments.length > 2 ? arguments[2] : void 0;
        if (!r) return "";
        t = t || r.original_width / r.original_height;
        var n = Math.floor(Math.min(e, r.max_width) / t);
        return r.url_pattern.replace("{width}", e).replace("{height}", n).replace("{format}", "jpg");
    }
};