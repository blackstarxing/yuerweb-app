<template>
	<div class="download f-cb" v-show="showAd">
		<img src="../../static/images/tvlogo.png" class="f-fl">
		<div class="f-fl">下载娱儿直播客户端</div>
		<i class="close" @click="closeAd"></i>
		<a href="https://yuertvfile.wangyuhudong.com" class="download-btn f-fr">点击下载</a>
	</div>
</template>
<script type="text/javascript">
  	export default {
    	data () {
      		return {
        		showAd:true,
      		}
  		},
  		components: {
        	
  		},   
  		methods:{
  			closeAd:function(){
  				this.showAd = false;
  			}
  		}
  	}
</script>
<style>
	.download{
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 800px;
		height: 64px;
		line-height: 64px;
		padding:0 10px;
		background: rgba(0,0,0,0.8);
		box-sizing: border-box;
		z-index: 999;
		color:#fff;
		font-size: 1.5rem;
	}
	.download img{
		height: 50px;
		margin: 7px 7px 0;
	}
	.close{
		position: absolute;
		top:50%;
		right: 10px;
		margin-top: -0.6rem;
		width: 1.2rem;
		height: 1.2rem;
		display: block;
		background: url('../../static/images/close.png') no-repeat;
		background-size: cover;
	}
	.download .download-btn{
		width: 80px;
		height: 34px;
		margin:15px 2rem 15px 0;
		text-align: center;
		line-height: 34px;
		border-radius: 5px;
		vertical-align: middle;
		font-size: 14px;
		color:#fff;
		background: #1cc7ff;
		font-family: Arial;
	}
	@media screen and (max-width: 320px) { 
		.download {
			font-size: 1.2rem
		}
	}
</style>