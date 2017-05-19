<template>
	<div>

		<top-head></top-head>
        <download></download>
		<div class="g-bd g-live-bd">
            <div class="g-bg-empty"></div>
            <div class="g-true" v-if="liveshowlist!=''">
                <!-- <div class="m-top">
                     <p class="u-tcon">当前在线：<span class="u-tspec">{{liveshow.total}}</span>位主播</p>        
                </div> -->
                <div class="g-all-live">全部直播</div>
                <div class="g-list">
                    <div class="m-recommend-live f-cb">
                        <div class="m-lst" v-for="item in liveshowlist">
                          <router-link :to="{path:'liveDetail',query: {id:item.id}}" class="m-livelink">
                              <div class="m-cover">
                                  <img v-bind:src="item.icon" alt="" class="screen" v-if="item.screen">
                                  <img v-bind:src="item.icon" alt="" v-else>
                                  <span v-bind:style="'background:'+item.tag_color">{{item.game_name}}</span>
                              </div>
                              <div class="m-info f-cb">
                                  <div class="m-head f-fl">
                                      <img v-bind:src="item.user_icon" alt="" class="anchor-head" v-if="item.user_icon">
                                      <img src="../../static/images/default.png" alt="" class="anchor-head" v-else>
                                      <img src="../../static/images/female.png" alt="" class="sex" v-if="item.sex">
                                      <img src="../../static/images/male.png" alt="" class="sex" v-else>
                                  </div>
                                  <div class="m-nickname f-fl">{{item.nickname}}</div>
                              </div>
                              <div class="m-title">{{item.title}}</div>
                          </router-link>
                        </div>
                        <div v-show="islast" class="paging" @click="vedios">加载更多</div>
                    </div>
                </div>  
            </div>
            <div class="g-false" v-else>
                <p class="u-desc">当前没有主播开播，查看更多主播精彩视频</p>
                <img src="../../static/images/empty_icon.png" alt="" class="u-imgs-empty">
                <router-link  to="/videos" class="u-switch">查看更多精彩视频</router-link>
            </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
     import download from '../components/download.vue'
    export default {
        data () {
            return {
                liveshow:'',
                liveshowlist:[],
                islast:'',
                page : 1,
                pageSize : 20,
                liveId:'',
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                var _this = this;

                _this.vedios(_this.page);
                $(window).scroll(function(){ 
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
                    if($(document).height() <= totalheight){
                        if(!_this.islast){
                            _this.page+=1;
                            _this.vedios(_this.page,_this.pageSize);
                        }
                        
                    }
                })
            })
        },
        components: {
            topHead,
            download
        }, 
        methods: {
            watchPeople: function (num) {
              // `this` points to the vm instance
              return num>10000 ? (num/10000).toFixed(1)+'万' : num;
            },
            vedios:function(page) {
                var parm = {};
                this.$http.get('/api/mobile/liveList', {params:{liveId:this.$route.query.id,page:page,pageSize:this.pageSize}}).then(function(response) {
                    this.liveshow=response.data.object;
                    // this.liveshowlist=this.liveshow.list;
                    // if(this.liveshowlist){
                        this.liveshowlist=this.liveshowlist.concat(response.data.object.list);
                    // }
                    this.islast=this.liveshow.isLast;
                }, function(response) {
                    console.log(response);
                });
            },
        }
    }
</script>
<style>
    .g-live-bd{
        /*width:96%;*/
        height:49.3rem;
        background:#fff;
        /*padding-bottom: 64px;*/
    }
    .g-bg-empty{
        width:100%;
        height:12px;
        background:#f5f5f5;
    }
    .g-all-live{
        width:100%;
        text-align:center;
        color:#333;
        font-size:16px;
        padding:20px 0;
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