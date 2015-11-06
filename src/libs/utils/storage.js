(function() {
    var globalData = store('globalData');
    if (!globalData) {
        store('globalData', {});
    }
})();

function store(itemName, obj) {
    if (obj) {
        if (typeof obj == 'object') {
            obj = JSON.stringify(obj);
            localStorage.setItem(itemName, obj);
        }
    } else {
        var data = localStorage.getItem(itemName);
        return JSON.parse(data);
    }
}

module.exports = {
    getItem: function(itemName) {
        return store(itemName);
    },
    setItem: function(itemName, obj) {
        store(itemName, obj);
    },
    clearItem: function(itemName) {
        localStorage.removeItem(itemName);
    },
    setCityData: function(obj) {
        this.setItem('cityData', obj);
    },
    getCityData: function() {
        return this.getItem('cityData') || {};
    },
    getGlobalData: function() {
        return this.getItem('globalData') || {};
    },
    storeInfo: function(key, value) {
        var globalData = this.getGlobalData();
        globalData[key] = value;
        this.setItem('globalData', globalData);
    },
    removeInfo: function(key) {
        var globalData = this.getGlobalData();
        delete globalData[key];
        this.setItem('globalData', globalData);
    },
    getUid: function() {
        return this.getGlobalData().uid || 0;
    },
    getPid: function() {
        return this.getGlobalData().pid || 0;
    },
    getUserId: function() {
        return this.getGlobalData().userId || 0;
    },
    getCurService: function() {
        return this.getGlobalData().curService || {};
    },
    getCurServiceOfBMW: function() {
        return this.getGlobalData().curServiceOfBMW || {};
    },
    getCurSupplier: function() {
        return this.getGlobalData().curSupplier || {};
    },
    getCurCity: function() {
        return this.getGlobalData().curCity || {};
    },
    getGPSCity: function() {
        return this.getGlobalData().gpsCity || {};
    },
    getCoords: function() {
        return this.getGlobalData().coords || {};
    }
}
