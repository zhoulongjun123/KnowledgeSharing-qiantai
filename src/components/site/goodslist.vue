<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item,index) in ginfo.catelist" :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p >
                                            <span v-for="(subitem,index) in item.subcates" :key="index">
                                                {{subitem.title}}
                                            </span>
                                       </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                            <dd>
                                                <a v-for="(subitem,index) in item.subcates" :key="index" href="/goods/43.html">
                                                    {{subitem.title}}
                                                </a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                               <el-carousel indicator-position="outside">
                                    <el-carousel-item v-for="item in ginfo.sliderlist" :key="item.id">
                                         <img  height="343" :src="item.img_url" alt="">
                                        <h3>{{item.title}}</h3>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    
                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in ginfo.toplist" :key="index">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|datefmt('yy-mm-dd')}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>
        <div class="section">
            <div v-for="(item,index) in groupdata" :key="index">
                <div class="main-tit">
                    <h2 v-text="item.catetitle"></h2>
                    <p>
                        <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">
                            {{subitem.subcatetitle}}
                        </a>
                    <a href="/goods/40.html">更多<i>+</i></a>
                    </p>
                </div>
                <div class="wrapper clearfix">
                    <div class="wrap-box">
                        <ul class="img-list">
                            <li v-for="items in item.datas" :key="items.artID">
                                <a href="/goods/show-91.html">
                                    <div class="img-box">
                                        <router-link v-bind="{to:'/site/goodsinfo/'+items.artID}">
                                            <img :src="items.img_url">   
                                        </router-link>
                                    </div>
                                    <div class="info">
                                        <h3>{{items.artTitle}}</h3>
                                        <p class="price">
                                            <b>￥{{items.sell_price}}</b>元</p>
                                        <p>
                                            <strong>库存 {{items.stock_quantity}}</strong>
                                            <span>市场价<s v-text="items.market_price"></s></span>
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ginfo: {},
                groupdata: {}
            }
        },
        created() {
            this.getginfo();
            this.getgroup();
        },
        methods: {
            getginfo() {
                this.$http.get('/site/goods/gettopdata/goods')
                    .then(res => {
                        this.ginfo = res.data.message;
                    });
            },
            getgroup() {
                this.$http.get('/site/goods/getgoodsgroup')
                    .then(res => {
                        this.groupdata = res.data.message;
                    })
            }
        }
    }
</script>
<style>
    @import url('../../../statics/elementuiCss/index.css');
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>