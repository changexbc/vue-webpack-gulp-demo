const md5 = require('./md5.js')


module.exports = {
    convertParams: function(params) {
        if(__PROD__){
            var appkey = 'ba0a57838f';
            var secret = '763f6ef3b392637b';
        }
        else{
            var appkey = '60000';
            var secret = 'LWLPg7pU4cwrcyy8PwDeGuaY0BHUoX';
        }
        var time = +new Date();
        var sign = appkey + secret + time;
        var o = {
            appkey: appkey,
            time: time
        };
        if (params) {
            sign += JSON.stringify(params);
            o.params = JSON.stringify(params);
        }
        o.sign = md5(sign);
        return o;
    },
    convertRequestURL: function(url) {
        var converted_url
        if(__PROD__){
            converted_url = "http://app.qichekb.com/"+url
        }
        else{
            converted_url = "http://192.168.10.3:9880/"+url
        }
        return converted_url
    },
    // setFirstRouter: function(thisRouter) {
    //     window.NOW_ROUTER = thisRouter._matched[0].handler.name

    //     if(window.FIRST_ROUTER){
    //         return
    //     }
    //     window.FIRST_ROUTER = thisRouter._matched[0].handler.name
    // },
    getQueryString: function (url) {
        if (url) {
            url = url.substr(url.indexOf("?") + 1);
        }
        var result = {}, queryString = url || location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g, m;

        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return result;
    },
    showLoading:function(){
        Daze.showMsg({
            type: 'loading',
            visible: true
        });
    },
    hideLoading:function(){
        Daze.showMsg({
            type: 'loading',
            visible: false
        });
    }

}
