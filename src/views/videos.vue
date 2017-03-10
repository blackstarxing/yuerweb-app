<template>
	<div>
		<top-head></top-head>
		<div class="g-bd">
			<div class="m-navigation">
           <button v-for="(item,index) in tabs" v-text="item.name" v-bind:class="[{curs:item.iscur},'u-sl-results']" @click="setCur(index)"></button>
      </div>
      <div class="g-list" v-if="videos.hotLive">
          <div class="m-video">
            <div class="m-vd f-cb" v-for="(currvideo,index) in videos.hotLive.list">
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
                            <label for=""><i class="icon iconfont icon-playtimes"></i>{{currvideo.play_times}}</label>
                            <label for=""><i class="icon iconfont icon-comment"></i>{{currvideo.comment_num}}</label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="paging">加载更多</div>
      </div>
      <!-- 最新视频 -->
      <div class="g-list" v-else>
          <div class="m-video">
            <div class="m-vd f-cb" v-for="(currvideo,index) in videos.newLive.list" >
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
                            <label for=""><i class="icon iconfont icon-playtimes"></i>{{currvideo.play_times}}</label>
                            <label for=""><i class="icon iconfont icon-comment"></i>{{currvideo.comment_num}}</label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="paging">加载更多</div>
      </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
  	export default {
    	data () {
      		return {
            videos:'',
            page:1,
            pageSize:20,
            type:'',
            tabs:[{
              name:"最热视频",
              iscur:true,
            },{
              name:"最新视频",
              iscur:false,
            }]
      		}
  		},
      mounted:function(){
        this.videototal(0);
      },
  		components: {
        	topHead
  		}, 
      methods:{
        videototal:function(type) {
                var parm = {};
                this.$http.get('/mobile/videoList', {params:{page : 1,pageSize : 20,type:type,}}).then(function(response) {
                    this.videos = response.data.object; 
                    console.log(this.videos) 
                }, function(response) {
                    console.log(response);
                });
            },
        setCur: function (index) {
                this.tabs.map(function (v,i) {
                    i==index? v.iscur=true: v.iscur=false;             
                });
                this.videototal(index);
            },
        Pagination:function(_page,_total,_pageSize,callback){
            var _this = this;
            _this._page = _page || 1;
            _this._total = _total || 0;
            _this._pageSize = _pageSize || 5;
            _this._maxPage = (Math.ceil((_this.cur_total)/ _this.cur_pageSize));
            _this._pageCallback=callback;

            $(".paging").show();
            if(_this._page==1){
                $(".paging").hide();
            }
            if(_this.local.cur_page==_this.local.cur_maxPage){
                $(".paging").hide();
            }
            if(_this.local.cur_maxPage==1){
                $(".paging").hide();
            }
          },

      }
  	}
</script>
<style>
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