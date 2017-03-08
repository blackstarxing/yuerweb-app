<template>
	<div>
		<top-head></top-head>
		<div class="g-bd g-live-bd">
            <div class="g-true" v-if="liveshow.list!='' ">
                <div class="m-top">
                     <p class="u-tcon">当前在线：<span class="u-tspec">{{liveshow.total}}</span>位主播</p>        
                </div>
                <div class="g-list">
                    <div class="m-recommend-live f-cb">
                        <div class="m-lst" v-for="item in liveshow.list">
                            <a href="" class="m-livelink">
                                <div class="m-cover">
                                    <img v-bind:src="item.icon" alt="">
                                    <span><i>·</i>{{item.game_name}}</span>
                                </div>
                                <div class="m-info f-cb">
                                    <div class="m-head f-fl">
                                        <img v-bind:src="item.icon" alt="" class="anchor-head">
                                        <img src="../../static/images/male.png" alt="" class="sex" v-if="item.sex">
                                        <img src="../../static/images/female.png" alt="" class="sex" v-else>
                                    </div>
                                    <div class="m-nickname f-fl">{{item.nickname}}</div>
                                    <span>{{item.online_num}}</span>
                                </div>
                                <div class="m-title">{{item.title}}</div>
                            </a>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="g-false" v-else>
                <p class="u-desc">当前没有主播开播，查看更多主播精彩视频</p>
                <router-link  to="/" class="u-switch">查看更多精彩视频</router-link>
            </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    export default {
        data () {
            return {
                liveshow:'',
                page : '',
                pageSize : '',
            }
        },
        mounted: function () {
            // this.$nextTick(function () {
                // var _this = this;
                this.vedios();
            // })
        },
        components: {
            topHead
        }, 
        methods: {
            vedios:function() {
                var parm = {};
                    this.$http.get('/mobile/liveList', {params:{page:1,pageSize:20}}).then(function(response) {
                    // if (response.data.code) {
                        this.liveshow = response.data.object;
                    // }
                }, function(response) {
                    console.log(response);
                });
            }
        }
    }
</script>
<style>
    .g-live-bd{
        width:96%;
        height:49.3rem;
        background:#141a20;
    }
    .m-top{
        margin:0 2%;
        height:3rem;
        line-height:3rem;
    }
    .u-tcon{
        font-size:1.5rem;
        color:#d0d1d2;
    }
    .u-tspec{
        color:#f36;
        margin-right:2%;
    }
    
</style>