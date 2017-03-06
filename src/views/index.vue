<template>
	<div>
		<top-head></top-head>
		<div class="g-bd">
			<div class="m-banner">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="banner in banner">
                            <img v-bind:src="'http://img.wangyuhudong.com/'+banner.img" alt="">
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                </div>   
            </div>
            <div class="g-list">
                <div class="m-recommend-live f-cb">
                    <div class="m-lst" v-for="recommendLive in index">
                        <a href="" class="m-livelink">
                            <div class="m-cover">
                                <img v-bind:src="recommendLive.icon" alt="">
                                <span><i>·</i>{{recommendLive.game_name}}</span>
                            </div>
                            <div class="m-info f-cb">
                                <div class="m-head f-fl">
                                    <img v-bind:src="'http://img.wangyuhudong.com/'+recommendLive.icon" alt="" class="anchor-head">
                                    <img src="../../static/images/male.png" alt="" class="sex" v-if="recommendLive.sex">
                                    <img src="../../static/images/female.png" alt="" class="sex" v-else>
                                </div>
                                <div class="m-nickname f-fl">{{recommendLive.nickname}}</div>
                                <span>{{recommendLive.online_num}}</span>
                            </div>
                            <div class="m-title">{{recommendLive.title}}</div>
                        </a>
                    </div>
                </div>
            </div>           
        </div>
    </div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    import swiper from '../../static/js/swiper.min.js'
    export default {
        data () {
            return {
                banner:'',
                index:'',
            }
        },
        beforeCreate: function () {
            
        },
        updated:function () {
            //banner 
            let mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                autoplay:2500,
                autoplayDisableOnInteraction:false,
                // 如果需要分页器
                pagination: '.swiper-pagination',
                observer:true,
            })   
        },
        mounted: function () {
            this.$nextTick(function () {
                let _this = this;

                // 获取轮播图数据
                _this.$http.get('/mobile/banner').then(function(response) {
                    _this.banner = response.data.object;
                    
                },function(response) {
                    console.log(response);
                });
                
                // 获取首页数据
                _this.$http.get('/mobile/index').then(function(response) {
                    _this.index = response.data.object;
                    
                },function(response) {
                    console.log(response);
                });
            })
        },
        components: {
            topHead
        },   
    }
</script>
<style>
    @import '../../static/css/swiper.min.css';
    .swiper-container{
        height: 21rem;
        color:#fff;
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #f36;
    }
</style>