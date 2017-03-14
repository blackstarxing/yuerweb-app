<template>
  <div>
    <!-- <top-head></top-head> -->
        <download></download>
    <div class="g-bd g-s-result">
            <div class="g-s-nav">
                <div class="m-s-nav">
                    <img src="../../static/images/nav_search.png" alt="" class="u-s-simg">
                    <input type="text" placeholder="可搜索房间号、主播昵称、游戏名称" class="u-s-search" v-model="keyword" @keyup.enter="search(keyword)">
                </div>
                <router-link  to="/" class="u-s-cancel">取消</router-link>
            </div>  
            <div class="g-s-list">
              <button v-for="(item,index) in tab" v-text="item.name" v-bind:class="[{cur:item.iscur},'u-sl-result']" @click="setCur(index)"></button>
            </div>
            <div class="g-list" v-if="totalshow.have!=0">
                <div class="m-live f-cb"  v-show="index=='0' || index=='1'"  >
                    <div v-if="livetotal!=0">
                        <h3><span class="u-h3-spec">{{livetotal}}</span><span>个相关直播</span><a @click="resultswitch(1)" class="u-more" v-show="index=='0' || index!='1'">更多&gt;</a></h3>
                        <div class="m-lst" v-for="lives in totallivelist">
                            <router-link :to="{path:'liveDetail',query: {id:lives.id}}" class="m-livelink">
                                <div class="m-cover">
                                    <img v-bind:src="lives.icon" alt="">
                                    <span><i>·</i>{{lives.game_name}}</span>
                                </div>
                                <div class="m-info f-cb">
                                    <div class="m-head f-fl">
                                        <img v-bind:src="lives.user_icon" alt="" class="anchor-head">
                                        <img src="../../static/images/female.png" alt="" class="sex" v-if="lives.sex">
                                        <img src="../../static/images/male.png" alt="" class="sex" v-else>
                                    </div>
                                    <div class="m-nickname f-fl">{{lives.nickname}}</div>
                                    <span>{{watchPeople(lives.online_num)}}</span>
                                </div>
                                <div class="m-title">{{lives.title}}</div>
                            </router-link>
                        </div>
                        <div class="paging" v-show="!liveislast && index=='1'" style="margin:0 auto;color:#161d24;" >加载更多</div>
                    </div> 
                    <div class="g-false" v-else v-show="index=='1'">
                        <p class="u-desc">没有搜索到任何与{{searchkeyword}}相关的直播间哟！</p>
                        <router-link  to="/lives" class="u-switch">查看更多精彩直播</router-link>
                    </div>                    
                </div>
                <div class="f-cb"  v-show="index=='0' || index=='2'" style="margin:0 2%" >
                    <div v-if="uptotal!=0">
                        <h3><span class="u-h3-spec">{{uptotal}}</span><span>个相关主播</span><a @click="resultswitch(2)" class="u-more" v-show="index=='0' || index!='2'">更多&gt;</a></h3>
                        <div class="m-result-host" v-for="(up,index) in totaluplist">
                                <div class="m-sh-label">
                                  <router-link :to="{path:'liveDetail',query: {id:up.id}}" class="m-livelink">
                                    <img v-bind:src="up.user_icon" alt="" class="u-shl-img" v-if="up.user_icon">
                                    <img src="../../static/images/default.png" alt="" class="u-shl-img" v-else>
                                    <div class="u-shl-tar">
                                      <p>
                                          <span class="u-shlt-sx">{{up.nickname}}</span>
                                          <i class="icon iconfont icon-female iconsearch" v-if="up.sex"></i>
                                          <i class="icon iconfont icon-male iconsearch" v-else></i>
                                          <i class="icon iconfont icon-authen iconauth" v-if="up.is_certificate"></i>
                                      </p>
                                      <p class="u-shlt-fs"><span>房间</span><span class="u-s-fs">{{up.id}}</span><span class="u-s-fspec">粉丝</span><span class="u-s-fs">{{up.fans}}</span></p>
                                    </div>
                                  </router-link>
                                  <div class="u-shl-focus">
                                    <a href="https://yuertvfile.wangyuhudong.com">
                                        <i class="icon iconfont icon-focus"></i>关注
                                    </a>
                                  </div>
                                </div>
                        </div>
                        <div class="paging" v-show="!upislast && index=='2'" style="margin:0 auto;color:#161d24;" >加载更多</div>
                    </div>
                    <div class="g-false" v-else v-show="index=='2'">
                        <p class="u-desc">没有搜索到任何与{{searchkeyword}}相关的主播哟！</p>
                        <router-link  to="/lives" class="u-switch">查看更多精彩直播</router-link>
                    </div>
                </div>
                <div class="m-video" v-show="index=='0' || index=='3'" >
                    <div v-if="videototal!=0">
                        <h3><span class="u-h3-spec">{{videototal}}</span><span>个相关视频</span><a @click="resultswitch(3)" class="u-more" v-show="index=='0' || index!='3'">更多&gt;</a></h3>
                        <div class="m-vd f-cb" v-for="(video,index) in totalvideolist">
                            <router-link :to="{path:'videoDetail',query: {id:video.id}}">
                                <div class="m-vd-icon f-fl">
                                    <img v-bind:src="video.icon" alt="">
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
                        <div class="paging" v-show="!videoislast && index=='3'" style="margin:0 auto;color:#161d24;" >加载更多</div>
                    </div>
                    <div class="g-false" v-else v-show="index=='3'" >
                        <p class="u-desc">没有搜索到任何与{{searchkeyword}}相关的视频哟！</p>
                        <router-link  to="/videos" class="u-switch">观看更多精彩视频</router-link>
                    </div>
                </div>
            </div> 
            <div class="g-false" v-else>
                <p class="u-desc">没有搜索到任何与{{searchkeyword}}相关的结果哟！</p>
                <router-link  to="/lives" class="u-switch" v-if="index==0 || index==1 || index==2">查看更多精彩直播</router-link>
                <router-link  to="/videos" class="u-switch" v-else-if="index==3">查看更多精彩视频</router-link>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import download from '../components/download.vue'
    export default {
      data () {
          return {
                totalshow:'',
                totallivelist:[],
                totaluplist:[],
                totalvideolist:[],
                livetotal:'',
                uptotal:'',
                videototal:'',
                liveislast:'',
                upislast:'',
                videoislast:'',
                keyword:'',
                searchkeyword:'',
                page : 1,
                livepage: 1,
                uppage: 1,
                videopage: 1,
                pageSize : 20,
                type: 0,
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
          var _this=this;
            _this.keyword = _this.$route.query.keyword;
            _this.searchkeyword = _this.keyword;
            _this.totals(0);
            $(window).scroll(function(){ 
            var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
            if($(document).height() <= totalheight){
                if(!_this.liveislast && _this.index==1){
                    _this.livepage+=1;
                    _this.totals(_this.index);
                }
                if(!_this.upislast && _this.index==2){
                  _this.uppage+=1;
                  _this.totals(_this.index);
                }
                if(!_this.videoislast && _this.index==3){
                  _this.videopage+=1;
                  _this.totals(_this.index);
                }
                
            }
        })
        },
      components: {
            download
      },
        methods: {
            resultswitch:function(i){
              this.index=i;
              this.setCur(this.index);
            },
            watchPeople: function (num) {
              // `this` points to the vm instance
              return num>10000 ? (num/10000).toFixed(1)+'万' : num;
            },
            search:function(keyword){
                var _this = this;
                  _this.$router.push({
                    path: '/searchresult?keyword='+keyword
                });
                _this.index = 0;
                this.keyword = this.$route.query.keyword;
                this.searchkeyword = this.keyword;
                this.page = 0;
                this.totalshow='';
                this.totallivelist=[];
                this.totaluplist=[];
                this.totalvideolist=[];
                this.livetotal='';
                this.uptotal='';
                this.videototal='';
                this.liveislast='';
                this.upislast='';
                this.videoislast='';
                this.livepage=1;
                this.uppage=1;
                this.videopage=1;
                _this.setCur(0);
                // _this.totals(_this.index);
            },
            totals:function(type) {
                var parm = {};
                if(type==1){
                  this.page = this.livepage;
                }else if(type==2){
                  this.page = this.uppage;
                }else if(type==3){
                  this.page=this.videopage;
                }else{
                  this.page=this.page;
                }
                this.$http.get('/api/mobile/search', {params:{keyword:this.$route.query.keyword,page:this.page,pageSize:this.pageSize,type:type}}).then(function(response) {
                        // 获得最大的对象
                        this.totalshow = response.data.object; 
                        // 对象下面的live对象，up对象，video对象下面的total;
                        if(this.totalshow.live){
                          this.livetotal=this.totalshow.live.total; 
                          if(this.page==1){
                            this.totallivelist=[];
                          }
                          // this.totallivelist=this.totalshow.live.list; 
                          this.totallivelist=this.totallivelist.concat(response.data.object.live.list);
                            this.liveislast=this.totalshow.live.isLast;
                        }
                        if(this.totalshow.up){
                          this.uptotal=this.totalshow.up.total;
                          if(this.page==1){
                            this.totaluplist=[];
                          }
                          // this.totaluplist=this.totalshow.up.list;
                          // console.log(this.totaluplist.length)
                          this.totaluplist=this.totaluplist.concat(response.data.object.up.list);
                            this.upislast=this.totalshow.up.isLast;
                        } 
                        if(this.totalshow.video){
                          this.videototal=this.totalshow.video.total; 
                          if(this.page==1){
                            this.totalvideolist=[];
                          }
                           // this.totalvideolist=this.totalshow.video.list;  
                            this.totalvideolist=this.totalvideolist.concat(response.data.object.video.list);
                            this.videoislast=this.totalshow.video.isLast;
                        }                 
                      
                }, function(response) {
                    console.log(response);
                });
            },
            setCur: function (index) {
              var _this=this;
                this.tab.map(function (v,i) {
                    i==index? v.iscur=true: v.iscur=false;     
                });
                _this.index = index;
                _this.totals(_this.index);
                
            }
        },   
    }
</script>
<style>
  .g-s-result{
    width:100%;
/*    padding-bottom:64px;*/
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
  .iconsearch{
    margin-left:2%;
  }
  .iconauth{
    margin-left:2%;
    color:#f36;
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
  .u-shl-focus a{
    display:inline-block;
    width:100%;
    height:2rem;
    line-height: 2rem;
    text-align:center;
    color:#fff;
    border-radius:2rem;
    background:#f36;
  }
</style>