<template>
	<div>
		<top-head></top-head>
		<div class="g-bd">
			<div class="m-navigation">
           <button v-for="(item,index) in tabs" v-text="item.name" v-bind:class="[{curs:item.iscur},'u-sl-results']" @click="setCur(index)"></button>
      </div>
      <div class="g-list">
          <div class="m-video">
            <div class="m-vd f-cb" v-for="(video,index) in videos">
                <router-link :to="{path:'videoDetail',query: {id:video.id}}">
                    <div class="m-vd-icon f-fl">
                        <img v-bind:src="video.icon" alt="">
                    </div>
                    <div class="m-vd-info f-fl">
                        <div class="m-title">{{video.title}}</div>
                        <div class="m-nickname">
                            <span>{{video.nickname}}</span>
                            <img src="../../static/images/rank_male.png" alt="" class="sex" v-if="video.sex">
                            <img src="../../static/images/rank_female.png" alt="" class="sex" v-else>
                        </div>
                        <div class="m-count">
                            <label for=""><i class="icon iconfont icon-playtimes"></i>{{video.play_times}}</label>
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
  	export default {
    	data () {
      		return {
            videos:'',
            page:1,
            pageSize:20,
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
        this.videototal();
      },
  		components: {
        	topHead
  		}, 
      methods:{
        videototal:function() {
                var parm = {};
                this.$http.get('/mobile/search', {params:{page : 1,pageSize : 20,}}).then(function(response) {
                        this.videos = response.data.object;
                }, function(response) {
                    console.log(response);
                });
            },
            setCur: function (index) {
                this.tabs.map(function (v,i) {
                    i==index? v.iscur=true: v.iscur=false; 
                    // this.index=index;              
                });

            }
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
  border-radius:3rem;
}
</style>