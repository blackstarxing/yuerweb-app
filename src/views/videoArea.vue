<template>
	<div>
		<top-head></top-head>
    <download></download>
		<div class="g-bd g-videospadding f-cb">
			<div class="m-navigation">
           <button v-for="(item,index) in tabs" v-text="item.name" v-bind:class="[{curs:item.iscur},'u-sl-results']" @click="setCur(index)"></button>
      </div>
      <div class="g-list g-list-bg" v-if="videos.hotLive">
        <div class="m-all-video">全部视频</div>
        <div class="m-lst" v-for="(currvideo,index) in videohot">
            <router-link :to="{path:'liveDetail',query: {id:currvideo.id}}" class="m-livelink">
                <div class="m-cover">
                    <img v-bind:src="currvideo.icon" alt="" class="screen" v-if="currvideo.screen">
                    <img v-bind:src="currvideo.icon" alt="" v-else>
                    <span v-bind:style="'background:'+currvideo.tag_color">{{currvideo.game_name}}</span>
                </div>
                <div class="m-info m-video-info f-cb">
                    <div class="m-nickname f-fl">{{currvideo.nickname}}</div>
                    <img src="../../static/images/female.png" alt="" class="sex f-fl" v-if="currvideo.sex">
                    <img src="../../static/images/male.png" alt="" class="sex f-fl" v-else>
                    <span class="f-fr">{{watchPeople(currvideo.play_times)}}</span>
                </div>
                <div class="m-title">{{currvideo.title}}</div>
              </router-link>
          </div>
        <div v-show="!hotislast" class="paging" >加载更多</div>
      </div>
      <!-- 最新视频 -->
      <div class="g-list g-list-bg" v-else>
        <div class="m-all-video">全部视频</div>
        <div class="m-lst" v-for="(currvideo,index) in videonew">
            <router-link :to="{path:'liveDetail',query: {id:currvideo.id}}" class="m-livelink">
                <div class="m-cover">
                    <img v-bind:src="currvideo.icon" alt="" class="screen" v-if="currvideo.screen">
                    <img v-bind:src="currvideo.icon" alt="" v-else>
                    <span v-bind:style="'background:'+currvideo.tag_color">{{currvideo.game_name}}</span>
                </div>
                <div class="m-info m-video-info f-cb">
                    <div class="m-nickname f-fl">{{currvideo.nickname}}</div>
                    <img src="../../static/images/female.png" alt="" class="sex f-fl" v-if="currvideo.sex">
                    <img src="../../static/images/male.png" alt="" class="sex f-fl" v-else>
                    <span class="f-fr">{{watchPeople(currvideo.play_times)}}</span>
                </div>
                <div class="m-title">{{currvideo.title}}</div>
              </router-link>
          </div>
        <div v-show="!newislast" class="paging">加载更多</div>
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
            videos:[],
            videohot:[],
            videonew:[],
            hotislast:'',
            newislast:'',
            gameId:'',
            page:1,
            hotpage:1,
            newpage:1,
            pageSize:20,
            type:0,
            tabs:[{
              name:"最热视频",
              iscur:true,
            },{
              name:"最新视频",
              iscur:false,
            }]
      		}
  		},
      updated:function(){
        this.$nextTick(function () {
          console.log(123);
        })
      },
      mounted:function(type){
        this.$nextTick(function () {
          var _this=this;
          _this.gameId=_this.$route.query.id;
          _this.videototal(0);
          $(window).scroll(function(){ 
              var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
              if($(document).height() <= totalheight){
                  if(!_this.hotislast && _this.type==0){
                    _this.hotpage+=1;
                    _this.videototal(_this.type);
                  }
                  if(!_this.newislast && _this.type==1){
                    _this.newpage+=1;
                      _this.videototal(_this.type);
                  } 
              }
          })
        }) 
      },
  		components: {
        	topHead,
          download
  		}, 
      methods:{
        watchPeople: function (num) {
              // `this` points to the vm instance
              return num>10000 ? (num/10000).toFixed(1)+'万' : num;
            },
        videototal:function(type) {
                var parm = {};
                if(type==0){
                  this.page=this.hotpage;
                }else{
                  this.page=this.newpage;
                }
                this.$http.get('/api/mobile/videoList', {params:{page :this.page,pageSize : 20,type:type,gameId:this.$route.query.id,}}).then(function(response) {
                  console.log(JSON.stringify);
                  console.log(123);
                    this.videos = response.data.object; 
                    if(this.videos.hotLive){
                      // 最热视频下面的list数组
                        if(this.page==1){
                          this.videohot=[];
                        }
                        // this.videohot=response.data.object.hotLive.list;
                        this.videohot=this.videohot.concat(response.data.object.hotLive.list);
                        this.hotislast=this.videos.hotLive.isLast;
                    }
                    if(this.videos.newLive){
                      // 最新视频下面的list数组
                        if(this.page==1){
                          this.videonew=[];
                        }
                        // this.videonew=response.data.object.newLive.list;
                        this.videonew=this.videonew.concat(response.data.object.newLive.list);
                        this.newislast=this.videos.newLive.isLast;
                    }
                }, function(response) {
                    console.log(response);
                });
            },
        setCur: function (index) {
                this.tabs.map(function (v,i) {
                    i==index? v.iscur=true: v.iscur=false;             
                });
                this.type=index;
                this.hotpage=1;
                this.newpage=1;
                this.videototal(index);
            },

      }
  	}
</script>
<style>
.g-videospadding{
  padding-bottom: 64px;
}
.g-list-bg{
  background:#fff;
}
.m-all-video{
  width:100%;
  text-align:center;
  color:#333;
  font-size:16px;
  padding:20px 0;
}
.m-navigation{
  width:50%;
  margin:5% 25%;
  height:3rem;
  line-height:3rem;
  border:1px solid #1cc7ff;
  border-radius:3rem;
}
.u-sl-results{
  border:0px;
  display:inline-block;
  width:50%;
  height:3rem;
  line-height:3rem;
  text-align:center;
  font-size:1.5rem;
  color:#1cc7ff;
  background:transparent;
}
.curs{
  background:#1cc7ff;
  color:#fff;
}
.curs:first-child{
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem; 
}
.curs:nth-child(2){
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem; 
}
</style>