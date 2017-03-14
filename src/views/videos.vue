<template>
	<div>
		<top-head></top-head>
    <download></download>
		<div class="g-bd g-videospadding">
			<div class="m-navigation">
           <button v-for="(item,index) in tabs" v-text="item.name" v-bind:class="[{curs:item.iscur},'u-sl-results']" @click="setCur(index)"></button>
      </div>
      <div class="g-list" v-if="videos.hotLive">
          <div class="m-video">
            <div class="m-vd f-cb" v-for="(currvideo,index) in videohot">
                <router-link :to="{path:'videoDetail',query: {id:currvideo.id}}">
                    <div class="m-vd-icon f-fl">
                        <img v-bind:src="currvideo.icon" alt="">
                    </div>
                    <div class="m-vd-info f-fl">
                        <div class="m-title">{{currvideo.title}}</div>
                        <div class="m-nickname">
                            <span>{{currvideo.nickname}}</span>
                            <i class="icon iconfont icon-female" v-if="currvideo.sex"></i>
                            <i class="icon iconfont icon-male" v-else></i>
                        </div>
                        <div class="m-count">
                            <label for=""><i class="icon iconfont icon-playtimes"></i>{{watchPeople(currvideo.play_times)}}</label>
                            <label for=""><i class="icon iconfont icon-comment"></i>{{currvideo.comment_num}}</label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-show="!hotislast" class="paging" >加载更多</div>
      </div>
      <!-- 最新视频 -->
      <div class="g-list" v-else>
          <div class="m-video">
            <div class="m-vd f-cb" v-for="(currvideo,index) in videonew">
                <router-link :to="{path:'videoDetail',query: {id:currvideo.id}}">
                    <div class="m-vd-icon f-fl">
                        <img v-bind:src="currvideo.icon" alt="">
                    </div>
                    <div class="m-vd-info f-fl">
                        <div class="m-title">{{currvideo.title}}</div>
                        <div class="m-nickname">
                            <span>{{currvideo.nickname}}</span>
                            <i class="icon iconfont icon-female" v-if="currvideo.sex"></i>
                            <i class="icon iconfont icon-male" v-else></i>
                        </div>
                        <div class="m-count">
                            <label for=""><i class="icon iconfont icon-playtimes"></i>{{watchPeople(currvideo.play_times)}}</label>
                            <label for=""><i class="icon iconfont icon-comment"></i>{{currvideo.comment_num}}</label>
                        </div>
                    </div>
                </router-link>
            </div>
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
      mounted:function(type){
        var _this=this;
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
                this.$http.get('/api/mobile/videoList', {params:{page :this.page,pageSize : 20,type:type,}}).then(function(response) {

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
                this.videototal(index);
            },

      }
  	}
</script>
<style>
.g-videospadding{
  /*padding-bottom: 64px;*/
}
.m-navigation{
  width:50%;
  margin:5% 25%;
  height:3rem;
  line-height:3rem;
  border:1px solid #f36;
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
  color:#f36;
  background:transparent;
}
.curs{
  background:#f36;
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