var storage = require('./storage')
module.exports = {
    login: function (callback) {
        Daze.login(function (resp) {
            if (Number(resp.isSuccess)) {
                var pid = Number(resp.pid),
                    uid = Number(resp.uid),
                    userId = Number(resp.userId);
                if (pid) {
                    storage.storeInfo('pid', pid);
                }
                if (uid) {
                    storage.storeInfo('uid', uid);
                }
                if (userId) {
                    storage.storeInfo('userId', userId);
                }
                if (callback) {
                    callback(resp);
                }
            }
        });
    },
    getSystem: function () {
            var system = '';

            if (!Daze.dazeClientVersion) {
                return system;
            }

            if (Daze.dazeClientVersion.indexOf('android') >= 0) {
                system = 'android';
            }
            else if (Daze.dazeClientVersion.indexOf('iOS') >= 0) {
                system = 'ios';
            }

            return system;
        },
}
