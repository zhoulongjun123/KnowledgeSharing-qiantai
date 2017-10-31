<template>
    <div class="tmpl">
        <div id="header" class="header">
            <!-- <Affix> -->
                <div class="head-top">
                    <div class="section">
                        <div class="left-box">
                            <span>vue2.0单页应用</span>
                            <a target="_blank" href="#"></a>
                            <a target="_blank" href="#"></a>
                        </div>
                        <div id="menu" class="right-box">
                            <router-link to="/site/login">登录</router-link>
                            <a href="/register.html">注册</a><strong>|</strong>
                            <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>-->
                            <router-link to="/site/car">
                                <i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount">{{this.$store.getters.getCount}}</span>)
                            </router-link>
                        </div>
                    </div>
                </div>
            
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                            <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                        </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <router-link to="/site/goodslist">
                                    购物商城
                                </router-link>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="/admin/index.aspx">
                                    问题提交
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
            <!-- </Affix> -->
        </div>
       <router-view></router-view>
    </div>
</template>
<script>
    import Affix from 'iview/src/components/affix';
    import {
        vm,
        key
    } from '../../kits/vm.js';
    $(function() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
            $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function() {
            $(".out", this).stop().animate({
                'top': '48px'
            }, 300); // move down - hide
            $(".over", this).stop().animate({
                'top': '0px'
            }, 300); // move down - show

        }, function() {
            $(".out", this).stop().animate({
                'top': '0px'
            }, 300); // move up - show
            $(".over", this).stop().animate({
                'top': '-48px'
            }, 300); // move up - hide
        });
    })
    export default {
        components: {
            Affix
        },
        data() {
            return {
                buycount: 0
            }
        },
        mounted() {
            // vm.$on(key, (buycount) => {
            //     this.buycount += buycount;
            // })
        },
        methods: {}
    }
</script>
<style>
    @import url('../../../statics/elementuiCss/index.css');
</style>