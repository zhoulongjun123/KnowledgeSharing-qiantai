<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-switch
                                        style="display:none;"
                                        v-model="isselectall"
                                        on-text="反选"
                                        off-text="全选"
                                        on-color="#13ce66"
                                        off-color="#bfcbd9"
                                        @change="allunall">
                                        
                                        </el-switch>
                                        <el-button type="success" @click="allunall">{{selecttxt}}</el-button>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">总金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="list.length<=0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item,index) in list" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch
                                        v-model="values[index]"
                                        on-text="已选"
                                        off-text="未选"
                                        on-color="#13ce66"
                                        off-color="#bfcbd9"
                                        @change="itemchange">    
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt="">
                                        <span v-text="item.title"></span>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <myinput @update="update" :options="{gid:item.id,count:item.buycount}"></myinput>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount }}</td>
                                    <td width="54" align="center">
                                        <el-button type="success" size="mini" @click="delData(item.id)">删除</el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品 <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{selletmentAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to ="/site/shopping">
                                <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                           </router-link>
                            <button class="submit" @click="toshopping">立即结算</button>
                            
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import myinput from '../subcom/myinputNumber.vue'
    import {
        updageItem,
        getItem,
        removeItem
    } from '../../kits/localStorageKit.js';
    export default {
        components: {
            myinput
        },
        data() {
            return {
                isselectall: false,
                values: [],
                list: [],
                selectCount: 0,
                selecttxt: '全选'
            }
        },
        created() {
            this.getcarInfo();
        },
        computed: {
            selletmentAmount() {
                var trueArr = this.values.filter(function(item) {
                    return item
                });
                this.selectCount = trueArr.length;
                var totalAmount = 0;
                this.values.forEach((item, index) => {
                    if (item) {
                        var goodsInfo = this.list[index];
                        totalAmount += (goodsInfo.sell_price * goodsInfo.buycount);
                    }
                });
                return totalAmount;
            }
        },
        methods: {
            toshopping() {
                var ids = "";
                var idsArr = [];
                this.values.forEach((item, index) => {
                    if (item) {
                        idsArr.push(this.list[index].id);
                    }
                })
                ids = idsArr.join(',');
                console.log(ids + "");
                this.$router.push({
                    name: 'shopping',
                    params: {
                        ids: ids
                    }
                });
                localStorage.setItem('ids', ids);
            },
            update(obj) {
                this.list.forEach(item => {
                    if (item.id == obj.gid) {
                        item.buycount = obj.count;
                    }
                });
                updageItem({
                    gid: obj.gid,
                    count: obj.count
                });
                this.list.push('');
                this.list.pop();
            },
            delData(goodsid) {
                var index = -1;
                index = this.list.findIndex(function(item) {
                    return item.id == goodsid
                });
                this.list.splice(index, 1);
                removeItem(goodsid);
            },
            allunall() {
                this.isselectall = !this.isselectall;
                if (this.isselectall) {
                    this.selecttxt = '反选'
                } else {
                    this.selecttxt = '全选'
                }
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isselectall;
                }
                this.values.push(false);
                this.values.pop();
            },
            itemchange(isselected) {
                if (!isselected) {
                    this.isselectall = false;
                    this.selecttxt = '全选';
                }
            },
            getcarInfo() {
                var goodsObj = getItem();
                var idArr = [];
                for (var key in goodsObj) {
                    idArr.push(key);
                }
                var ids = idArr.join(',');
                // console.log(ids + '---------->111111111111');
                this.$http.get('/site/comment/getshopcargoods/' + ids)
                    .then(res => {
                        this.list = res.data.message;
                        var goodsObj = getItem();
                        this.list.forEach((item, index) => {
                            this.values.push(false);
                            item.buycount = goodsObj[item.id];
                        });
                    })
            }
        }
    }
</script>