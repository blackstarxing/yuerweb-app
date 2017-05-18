<template>
	<div>
		<top-head></top-head>
	    <download></download>
	    <video class="mejs-wmp" width="100%" height="203" v-bind:src="details.rtmp" type="video/mp4" id="player1" poster="" controls="controls" preload="none" webkit-playsinline playsinline></video>
		<div class="subscribe clearfix" style="background:#fff0;-webkit-box-shadow: 0 5px 5px -2px rgba(0,0,0,0.2);-moz-box-shadow: 0 5px 5px -2px rgba(0,0,0,0.2);box-shadow: 0 5px 5px -2px rgba(0,0,0,0.2);">
			<div class="head f-fl">
				<img v-bind:src="details.user_icon" alt="">
				<img src="../../static/images/female.png" alt="" class="sex" v-if="details.sex">
                <img src="../../static/images/male.png" alt="" class="sex" v-else>
			</div>
			<div class="name f-fl">
				<h4>{{details.nickname}}</h4>
				<div>粉丝 <span>{{details.fans}}</span></div>
			</div>
			<a href="https://yuertvfile.wangyuhudong.com" class="follow f-fr"><img src="../../static/images/follow.png" alt="">关注</a>
		</div>

	</div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    import download from '../components/download.vue'
    export default {
        data () {
            return {
                details:''
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let _this = this;

                // 获取视频页详情数据
                _this.$http.get('/api/mobile/videoDetail',{params:{videoId:_this.$route.query.id}}).then(function(response) {
                    _this.details = response.data.object;
                    
    
                },function(response) {
                    console.log(response);
                });
            })
        },
        methods:{
            
        },
        components: {
            topHead,
            download
        },   
    }
</script>
<style>
	.subscribe{
		height: 46px;
		padding:15px;
		background: #fff;
		position: relative;
		/*border-bottom:1px solid #e4e4e4;*/
	}
	.subscribe .name{
		font-size: 13px;
		color: #465667;
	}
	.subscribe .head{
		position: relative;
	}
	.subscribe .head img.sex{
		position: absolute;
		width: 15px;
		height: 15px;
		right: 0;
		bottom: 3px;
	}
	.subscribe .name h4{
		font-size: 15px;
		color:#333;
		margin-bottom: 15px;
		width: 160px;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
	.subscribe .name span.fans-num{
		color: #ff3366;
	}
	.subscribe .sub{
		display: inline-block;
		font-weight: bold;
		margin-top: 11px;
		padding:0 8px;
		border:1px solid #ff3366;
		border-radius: 2px;
		color:#ff3366;
		line-height: 24px;
		margin-right: 9px;
	}
	.anchor .intro{
		padding:12px 15px 15px;
		font-size: 14px;
		line-height: 23px;
		color: #9a9a9a;
		background: #fff;
		margin-top: 10px;
	}
	.anchor .intro h3{
		font-size: 16px;
		margin-bottom: 10px;
	}
	.anchor .intro h3 img{
		width: 15px;
		vertical-align: middle;
		margin-right: 8px;
	}
	@media screen and (max-width: 320px) { 
		.subscribe .head img {
			width: 40px;
			height: 40px;
		}
	}
</style>