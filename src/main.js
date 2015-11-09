FastClick.attach(document.body);

import Vue from 'vue'
import Router from 'vue-router'
import App from './views/App.vue'
var client = require('./libs/utils/client')
var ga_storage = require('./libs/utils/GALocalStorage')


// if (__DEV__) {
//     require('./libs_native/native.js')
//     init()
// }
// else {
//     document.addEventListener("DazeJSObjReady", function() {
//         client.login(function() {
//             init()
//         })
//     }, false);
// }

var init = function() {
    Vue.config.debug = true // 开启调试模式
    Vue.use(Router)
    var router = new Router({
        transitionOnLoad: true
    });

    router.map({
        '/': {
            name: 'index',
            component: require('./views/IndexView.vue')
        },
        '/edit/:license/:regDate/:injured': {
            name: 'car-edit',
            component: require('./views/EditView.vue')
        },
        '/edit/:license': {
            name: 'car-complete',
            component: require('./views/EditView.vue')
        }
    });

    router.start(App, '#app');

    ga_storage._trackPageview('/carService/nianjian', '年检查询工具');

    var system = client.getSystem()
        //设置ios返回按钮
    if (system == 'ios') {
        setTimeout(function() {
            Daze.showOptionMenu({
                    "items": [{
                        "title": "返回",
                        "id": "back",
                        "side": "left"
                    }, {
                        "title": "",
                        "id": "refresh",
                        "side": "right"
                    }]
                },
                function(item) {
                    if (item.id == 'back') {
                        if (window.FIRST_ROUTER == window.NOW_ROUTER) {
                            Daze.call("dismissSelf", {
                                moduleName: "navigator"
                            }, null);
                        } else {
                            history.go(-1)
                        }
                    } else {
                        location.reload()
                    }
                }
            )
        }, 1000)
    }
}()
