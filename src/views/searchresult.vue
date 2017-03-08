<template>
	<div>
		<!-- <top-head></top-head> -->
		<div class="g-bd g-s-result">
            <div class="g-s-nav">
                <div class="m-s-nav">
                    <img src="../../static/images/nav_search.png" alt="" class="u-s-simg">
                    <input type="text" placeholder="可搜索房间号、主播昵称、游戏名称" class="u-s-search" v-model="keyword">
                </div>
                <router-link  to="/" class="u-s-cancel">取消</router-link>
            </div>  
            <div class="g-s-list">
              <button v-for="(item,index) in tab" v-text="item.name" v-bind:class="[{cur:item.iscur},'u-sl-result']" @click="setCur(index)"></button>
            </div>
            <div class="g-list" v-if="totalshow!=''">
                <div class="m-live f-cb"  v-show="index=='0' || index=='1'">
                    <div v-if="totalshow.live.total!=0">
                        <h3><span class="u-h3-spec">{{totalshow.live.total}}</span><span>个相关直播</span><router-link to="/lives" class="u-more">更多&gt;</router-link></h3>
                        <div class="m-lst" v-for="live in totalshow.live.list">
                            <router-link :to="{path:'liveDetail',query: {id:live.id}}" class="m-livelink">
                                <div class="m-cover">
                                    <img v-bind:src="live.icon" alt="">
                                    <span><i>·</i>{{live.game_name}}</span>
                                </div>
                                <div class="m-info f-cb">
                                    <div class="m-head f-fl">
                                        <img v-bind:src="live.user_icon" alt="" class="anchor-head">
                                        <img src="../../static/images/male.png" alt="" class="sex" v-if="live.sex">
                                        <img src="../../static/images/female.png" alt="" class="sex" v-else>
                                    </div>
                                    <div class="m-nickname f-fl">{{live.nickname}}</div>
                                    <span>{{live.online_num}}</span>
                                </div>
                                <div class="m-title">{{live.title}}</div>
                            </router-link>
                        </div>
                    </div>
                    <div class="g-false" v-else v-show="index=='0' || index=='1'">
                        <p class="u-desc">没有搜索到任何与“英雄联盟”相关的直播间哟！</p>
                        <router-link  to="/" class="u-switch">查看更多精彩直播</router-link>
                    </div>                    
                </div>
                <div class="f-cb"  v-show="index=='0' || index=='2'">
                    <div v-if="totalshow.up.total!=0">
                        <h3><span class="u-h3-spec">{{totalshow.up.total}}</span><span>个相关主播</span><router-link to="/lives" class="u-more">更多&gt;</router-link></h3>
                        <div class="m-result-host" v-for="(up,index) in totalshow.up.list">
                            <router-link :to="{path:'liveDetail',query: {id:up.id}}" class="m-livelink">
                                <div class="m-sh-label">
                                  <img v-bind:src="up.user_icon" alt="" class="u-shl-img">
                                  <div class="u-shl-tar">
                                    <p>
                                        <span class="u-shlt-sx">{{up.nickname}}</span>
                                        <i class="icon iconfont icon-male" v-if="up.sex"></i>
                                        <i class="icon iconfont icon-female" v-else></i>
                                        <i class="icon iconfont icon-vip"></i>
                                    </p>
                                    <p class="u-shlt-fs"><span>房间</span><span class="u-s-fs">{{up.id}}</span><span class="u-s-fspec">粉丝</span><span class="u-s-fs">{{up.fans}}</span></p>
                                  </div>
                                  <div class="u-shl-focus">
                                    <button><i class="icon iconfont icon-focus"></i>关注</button>
                                  </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="g-false" v-else v-show="index=='0' || index=='2'">
                        <p class="u-desc">没有搜索到任何与“英雄联盟”相关的主播哟！</p>
                        <router-link  to="/" class="u-switch">关注更多主播</router-link>
                    </div>
                </div>
                <div class="m-video" v-show="index=='0' || index=='3'">
                    <div v-if="totalshow.video.total!=0">
                        <h3><span class="u-h3-spec">{{totalshow.video.total}}</span><span>个相关视频</span><router-link to="/videos" class="u-more">更多&gt;</router-link></h3>
                        <div class="m-vd f-cb" v-for="(video,index) in totalshow.video.list">
                            <router-link :to="{path:'videoDetail',query: {id:video.id}}">
                                <div class="m-vd-icon f-fl">
                                    <img v-bind:src="video.icon" alt="">
                                </div>
                                <div class="m-vd-info f-fl">
                                    <div class="m-title">{{video.title}}</div>
                                    <div class="m-nickname">
                                        <span>{{video.nickname}}</span>
                                        <i class="icon iconfont icon-male" v-if="video.sex"></i>
                                        <i class="icon iconfont icon-female" v-else></i>
                                    </div>
                                    <div class="m-count">
                                        <label for=""><i class="icon iconfont icon-playtimes"></i>{{video.play_times}}</label>
                                        <label for=""><i class="icon iconfont icon-comment"></i>{{video.comment_num}}</label>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="g-false" v-else v-show="index=='0' || index=='3'">
                        <p class="u-desc">没有搜索到任何与“英雄联盟”相关的视频哟！</p>
                        <router-link  to="/" class="u-switch">观看更多精彩视频</router-link>
                    </div>
                </div>
            </div> 
            <div class="g-false" v-else="totalshow==''">
                <p class="u-desc">没有搜索到任何与“英雄联盟”相关的结果哟！</p>
                <router-link  to="/" class="u-switch">查看更多精彩直播</router-link>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
  	export default {
    	data () {
      		return {
                totalshow:'',
                keyword:'王者荣耀',
                page : 1,
                pageSize : 20,
                type: 0 ,
                userId:'',
                tab: [{
                    name:"综合",
                    iscur:true,
                    },
                    {
                    name:"直播",
                    iscur:false,
                    },
                    {
                    name:"主播",
                    iscur:false,
                    },
                    {
                    name:"视频",
                    iscur:false,
                }],
                index:0,
      		}
  		},
        mounted: function () {
                this.totals();
        },
  		components: {
  		},
        methods: {
            totals:function() {
                var parm = {};
                this.$http.get('/mobile/search', {params:{keyword:this.keyword,page : 1,pageSize : 20,type: 0 }}).then(function(response) {
                        this.totalshow = response.data.object;
                        console.log(this.totalshow.live);
                }, function(response) {
                    console.log(response);
                });
            },
            setCur: function (index) {
                this.tab.map(function (v,i) {
                    i==index? v.iscur=true: v.iscur=false;                    
                });
                this.index = index;
            }
        },   
  	}
</script>
<style>

  .g-s-result{
    width:100%;
  }
  .g-s-nav{
    width:100%;
    height:3.7rem;
    background:#1c232d;
    overflow:hidden;
  }
  .m-s-nav{
    position:relative;
    float:left;
    width:80%;
    height:2.8rem;
    line-height:2.8rem;
    text-align:center;
  }
  input.u-s-search{
    width:85%;
    height:2.2rem;
    line-height:2.2rem;
    margin:3% 0% 0% 2%;
    padding-left:10%;
    background:#161d24;
    border:0px;
    border-radius:2%;
  }
  input::-webkit-input-placeholder { /* WebKit browsers */ 
    font-size:1.2rem;
      color: #465667; 
  } 
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
    font-size:1.2rem;
      color: #465667; 
  } 
  input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
    font-size:1.2rem;
      color: #465667; 
  } 
  input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
    font-size:1.2rem;
      color: #465667; 
  } 
  .u-s-simg{
    display:inline-block;
    position:absolute;
    width:15px;
    height:15px;
    top:41%;
    left:6.5%;
  }
  .u-s-cancel{
    display:inline-block;
    width:10%;
    height:10%;
    line-height:10%;
    text-align:center;
    font-size:1.5rem;
    color:#9da4ad;
    margin:6% 0% 0% 4%;
  }
  .u-h3-spec{
    color:#f36;
  }
  /*综合直播主播视频*/
  .g-s-list{
    height:3rem;
    width:100%;
    background:#1c232d;
  }
  .u-sl-result{
    border:0px;
    display:inline-block;
    width:23.5%;
    height:3rem;
    line-height:3rem;
    text-align:center;
    font-size:1.5rem;
    color:#d0d1d2;
    background:transparent;
  }
  .cur{
    color:#f36;
    border-bottom:0.2rem solid #f36;
  }
    
  .m-result-host{
    width:100%;
    height:6rem;
    background:#242d3c;
    margin-top:2%;
    overflow:hidden;
  }
  .u-shl-img{
    display:inline-block;
    width:50px;
    height:50px;
    border-radius:50%;
    float:left;
    margin:3%;
  }
  .u-shl-tar{
    float:left;
    width:58%;
    margin:2% 0%;
  }
  .u-shl-tar p{
    margin:3% 0;
  }
  .u-shlt-sx{
    font-size:1.3rem;
    color:#d1d4d8;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .u-shlt-fs{
    font-size:1.1rem;
    color:#626f7e;
  }
  .u-s-fs{
    color:#3cc;
    margin-left:2%;
  }
  .u-s-fspec{
    margin-left:10%;
  }
  .u-shl-focus{
    width:15%;
    float:left;
    margin:6% 2%;
    /*margin:3%;*/
  }
  .u-shl-focus button{
    border:0px;
    width:100%;
    height:2rem;
    color:#fff;
    border-radius:2rem;
    background:#f36;
  }
</style>