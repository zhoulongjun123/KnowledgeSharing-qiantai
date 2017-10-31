import Vue from 'vue';
import App from './App.vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);
import layout from './components/site/layout.vue';
import goodslist from './components/site/goodslist.vue';
import goodsinfo from './components/site/goodsinfo.vue';
import car from './components/site/car.vue';
import shopping from './components/site/shopping.vue';
import login from './components/site/login.vue';
import pay from './components/site/pay.vue'
var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/site/goodslist' },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo },
                { name: 'car', path: 'car', component: car },
                { name: 'shopping', path: 'shopping', component: shopping, meta: { islogin: true } },
                { name: 'login', path: 'login', component: login },
                { name: 'pay', path: 'pay', component: pay }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.name != 'login') {
        localStorage.setItem('currentRouteName', to.name);
    }
    if (to.meta.islogin) {
        axios.get('/site/account/islogin').then(res => {
            if (res.data.code == "logined") {
                next();
            } else {
                router.push({ name: 'login' })
            }
        })
    } else {
        next();
    }
});
var state = {
    buyCount: 0
}
var actions = {
    changeBuyCount({ commit }, parmsBuyCount) {
        commit('changeBuyCount', parmsBuyCount);
    }
}
var mutations = {
    changeBuyCount(state, parmsBuyCount) {
        state.buyCount += parmsBuyCount;
    }
}
import { getItem } from './kits/localStorageKit.js';
var getters = {
    getCount(state) {
        if (state.buyCount > 0) {
            return state.buyCount;
        }
        var goodsObj = getItem();
        var count = 0;
        for (var key in goodsObj) {
            count += goodsObj[key];
        }
        state.buyCount = count;
        return state.buyCount;
    }
};
import vuex from 'vuex';
Vue.use(vuex);
var store = new vuex.Store({
        state,
        actions,
        mutations,
        getters
    })
    // =================================

import axios from 'axios';
axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;
axios.defaults.withCredentials = true;
Vue.use(axios);
// console.log(axios + "111");
// console.log(111);
import elementUI from 'element-ui';
Vue.use(elementUI);
import '../statics/site/css/style.css';
Vue.filter('datefmt', (input, fmtstring) => {
    var date = new Date(input);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (fmtstring == 'yy-mm-dd') {
        return y + '-' + m + '-' + d;
    }
});
new Vue({
    el: '#app',
    router,
    store,
    render: create => create(App)
})