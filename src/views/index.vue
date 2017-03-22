<template>
	<div>
		<top-head></top-head>
        <download></download>
		<div class="g-bd">
			<div class="m-banner">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="banner in banner">
                            <router-link :to="{path:'liveDetail',query: {id:banner.target}}" v-if="banner.type==1">
                                <img v-bind:src="'http://img.wangyuhudong.com/'+banner.img" alt="">
                            </router-link>
                            <router-link :to="{path:'videoDetail',query: {id:banner.target}}" v-else-if="banner.type==2">
                                <img v-bind:src="'http://img.wangyuhudong.com/'+banner.img" alt="">
                            </router-link>
                            <a v-bind:href="banner.target" v-else>
                                <img v-bind:src="'http://img.wangyuhudong.com/'+banner.img" alt="">
                            </a>
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                </div>   
            </div>
            <div class="g-list">
                <div class="m-live f-cb" v-if="index.recommend_live!=''">
                    <h3><i class="icon iconfont icon-recommend"></i>推荐直播</h3>
                    <div class="m-lst" v-for="live in index.recommend_live">
                        <router-link :to="{path:'liveDetail',query: {id:live.id}}" class="m-livelink">
                            <div class="m-cover">
                                <img v-bind:src="live.icon" alt="" class="screen" v-if="live.screen">
                                <img v-bind:src="live.icon" alt="" v-else>
                                <span><i>·</i>{{live.game_name}}</span>
                            </div>
                            <div class="m-info f-cb">
                                <div class="m-head f-fl">
                                    <img v-bind:src="live.user_icon" alt="" class="anchor-head" v-if="live.user_icon">
                                    <img src="../../static/images/default.png" alt="" class="anchor-head" v-else>
                                    <img src="../../static/images/female.png" alt="" class="sex" v-if="live.sex">
                                    <img src="../../static/images/male.png" alt="" class="sex" v-else>
                                </div>
                                <div class="m-nickname f-fl">{{live.nickname}}</div>
                                <span>{{watchPeople(live.online_num)}}</span>
                            </div>
                            <div class="m-title">{{live.title}}</div>
                        </router-link>
                    </div>
                </div>
                <div class="m-live f-cb" v-if="index.hot_live!=''">
                    <h3><i class="icon iconfont icon-hot"></i>热门直播<router-link to="/lives" class="u-more">更多&gt;</router-link></h3>
                    <div class="m-lst" v-for="live in index.hot_live">
                        <router-link :to="{path:'liveDetail',query: {id:live.id}}" class="m-livelink">
                            <div class="m-cover">
                                <img v-bind:src="live.icon" alt="" class="screen" v-if="live.screen">
                                <img v-bind:src="live.icon" alt="" v-else>
                                <span><i>·</i>{{live.game_name}}</span>
                            </div>
                            <div class="m-info f-cb">
                                <div class="m-head f-fl">
                                    <img v-bind:src="live.user_icon" alt="" class="anchor-head" v-if="live.user_icon">
                                    <img src="../../static/images/default.png" alt="" class="anchor-head" v-else>
                                    <img src="../../static/images/female.png" alt="" class="sex" v-if="live.sex">
                                    <img src="../../static/images/male.png" alt="" class="sex" v-else>
                                </div>
                                <div class="m-nickname f-fl">{{live.nickname}}</div>
                                <span>{{watchPeople(live.online_num)}}</span>
                            </div>
                            <div class="m-title">{{live.title}}</div>
                        </router-link>
                    </div>
                </div>
                <div class="m-live f-cb" v-for="game in index.game_live" v-show="game.lives.length>=4">
                    <h3><i class="icon iconfont icon-game"></i>{{game.game_name}}</h3>
                    <div class="m-lst" v-for="live in game.lives">
                        <router-link :to="{path:'liveDetail',query: {id:live.id}}" class="m-livelink">
                            <div class="m-cover">
                                <img v-bind:src="live.icon" alt="" class="screen" v-if="live.screen">
                                <img v-bind:src="live.icon" alt="" v-else>
                                <span><i>·</i>{{live.game_name}}</span>
                            </div>
                            <div class="m-info f-cb">
                                <div class="m-head f-fl">
                                    <img v-bind:src="live.user_icon" alt="" class="anchor-head" v-if="live.user_icon">
                                    <img src="../../static/images/default.png" alt="" class="anchor-head" v-else>
                                    <img src="../../static/images/female.png" alt="" class="sex" v-if="live.sex">
                                    <img src="../../static/images/male.png" alt="" class="sex" v-else>
                                </div>
                                <div class="m-nickname f-fl">{{live.nickname}}</div>
                                <span>{{watchPeople(live.online_num)}}</span>
                            </div>
                            <div class="m-title">{{live.title}}</div>
                        </router-link>
                    </div>
                </div>
                <div class="m-video">
                    <h3><i class="icon iconfont icon-video"></i>精彩视频<router-link to="/videos" class="u-more">更多&gt;</router-link></h3>
                    <div class="m-vd f-cb" v-for="video in index.video">
                        <router-link :to="{path:'videoDetail',query: {id:video.id}}">
                            <div class="m-vd-icon f-fl">
                                <img v-bind:src="video.icon" alt="" class="screen" v-if="video.screen">
                                <img v-bind:src="video.icon" alt="" v-else>
                            </div>
                            <div class="m-vd-info f-fl">
                                <div class="m-title">{{video.title}}</div>
                                <div class="m-nickname">
                                    <span>{{video.nickname}}</span>
                                    <i class="icon iconfont icon-female" v-if="video.sex"></i>
                                    <i class="icon iconfont icon-male" v-else></i>
                                </div>
                                <div class="m-count">
                                    <label for=""><i class="icon iconfont icon-playtimes"></i>{{watchPeople(video.play_times)}}</label>
                                    <label for=""><i class="icon iconfont icon-comment"></i>{{video.comment_num}}</label>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>           
        </div>
    </div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    import download from '../components/download.vue'
    import swiper from '../../static/js/swiper.min.js'
    export default {
        data () {
            return {
                banner:'',
                index:'',
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let _this = this;

                // 获取banner数据
                _this.$http.get('/api/mobile/banner').then(function(response) {
                    _this.banner = response.data.object;
                    // 获取首页数据
                    _this.$http.get('/api/mobile/index').then(function(response) {
                        _this.index = response.data.object;
                        let mySwiper = new Swiper ('.swiper-container', {
                            direction: 'horizontal',
                            loop: true,
                            autoplay : 2500,
                            autoplayDisableOnInteraction : false,
                            // 如果需要分页器
                            pagination: '.swiper-pagination',
                            observer:true,
                            observeParents:true,
                        }); 
                    },function(response) {
                        console.log(response);
                    });
                },function(response) {
                    console.log(response);
                });
            })
        },
        methods:{
            watchPeople: function (num) {
              // `this` points to the vm instance
              return num>10000 ? (num/10000).toFixed(1)+'万' : num;
            }
        },
        computed: {

        },
        components: {
            topHead,
            download
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