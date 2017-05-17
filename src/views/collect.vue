<template>
	<div>
		<top-head></top-head>
        <download></download>
		<div class="g-bd">
			<div class="">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="banner in index.banner">
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
            <div class="news f-cb">
                <img src="../../static/images/news.png" alt="" class="f-fl">
                <div class="pvp-list f-fl">
                    <ul id='list1'></ul>
                    <ul id="list2"></ul>
                </div>
            </div>
            <div class="g-list" v-if="loaded">
                <div class="m-live f-cb" v-if="index.hotVideo!=''">
                    <h3><img src="../../static/images/hot_icon.png" alt="">热门视频</h3>
                    <div class="m-lst" v-for="live in index.hotVideo">
                        <router-link :to="{path:'liveDetail',query: {id:live.id}}" class="m-livelink">
                            <div class="m-cover">
                                <img v-bind:src="live.icon" alt="" class="screen" v-if="live.screen">
                                <img v-bind:src="live.icon" alt="" v-else>
                                <span v-bind:style="'background:'+live.tag_color">{{live.game_name}}</span>
                            </div>
                            <div class="m-info m-video-info f-cb">
                                <div class="m-nickname f-fl">{{live.nickname}}</div>
                                <img src="../../static/images/female.png" alt="" class="sex f-fl" v-if="live.sex">
                                <img src="../../static/images/male.png" alt="" class="sex f-fl" v-else>
                                <span class="f-fr">{{watchPeople(live.play_times)}}</span>
                            </div>
                            <div class="m-title">{{live.title}}</div>
                        </router-link>
                    </div>
                    <div><router-link to="/videos" class="u-more">全部视频<img src="../../static/images/more_icon.png" alt=""></router-link></div>
                </div>
                <div class="m-live f-cb" v-for="game in index.sortVideos" v-show="game.videos.length>=0">
                    <h3><img v-bind:src="'http://img.wangyuhudong.com/'+game.index_sort_icon" alt="">{{game.game_name}}</h3>
                    <div class="m-lst" v-for="live in game.videos">
                        <router-link :to="{path:'liveDetail',query: {id:live.id}}" class="m-livelink">
                            <div class="m-cover">
                                <img v-bind:src="live.icon" alt="" class="screen" v-if="live.screen">
                                <img v-bind:src="live.icon" alt="" v-else>
                                <span><i>·</i>{{live.game_name}}</span>
                            </div>
                            <div class="m-info m-video-info f-cb">
                                <div class="m-nickname f-fl">{{live.nickname}}</div>
                                <img src="../../static/images/female.png" alt="" class="sex f-fl" v-if="live.sex">
                                <img src="../../static/images/male.png" alt="" class="sex f-fl" v-else>
                                <span class="f-fr">{{watchPeople(live.play_times)}}</span>
                            </div>
                            <div class="m-title">{{live.title}}</div>
                        </router-link>
                    </div>
                    <div><router-link :to="{path:'videoArea',query: {id:game.game_id}}" class="u-more">进入专区<img src="../../static/images/more_icon.png" alt=""></router-link></div>
                </div>
                <!-- <div class="m-video">
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
                </div> -->
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
                loaded:false,
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let _this = this;

                // 获取banner数据
                _this.$http.get('/api/mobile/wellSelected').then(function(response) {
                    _this.index = response.data.object;
                    // 获取首页数据
                    let banner = setTimeout(function(){
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
                        _this.loaded = true;
                        var content = "";
                        var news = response.data.object.news;
                        for(var i = 0;i<news.length;i++){
                            content+='<li><a href="http://www.yuerlive.top/mobile/news?id='+news[i].id+'">'+news[i].title+'</a></li>';
                        }
                        $('#list1').html(content);
                        var index = 1;
                        var h = $('.pvp-list').height();
                        $("#list2").html($("#list1").html());
                        var mar = function () {
                            if (index<=$('#list1 li').length) { 
                                $('.pvp-list #list1').animate({marginTop:-index*h});
                                index++;
                            }
                            else {               
                                index = 1;
                                $('.pvp-list #list1').css('marginTop',0).animate({marginTop:-index*h});
                                index++;
                            }

                        };
                        var vid = setInterval(mar, 2000);
                    },500)
                    
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
        height: 12.5rem;
        color:#fff;
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #1cc7ff;
    }
    .news{
        background: url('../../static/images/arrow.png') 98% center no-repeat #fff;
        background-size: 0.8rem;
        padding:1rem 20px;
    }
    .news img{
        width: 4rem;
    }
    .pvp-list{
        margin-left: 10px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        overflow: hidden;
    }
    .pvp-list li{
        height: 20px;
        overflow: hidden;
    }
    .pvp-list a{
        color:#333;
    }
</style>