<template>
	<div class="download f-cb">
		<img src="../../static/images/tvlogo.png" class="f-fl">
		<a href="https://yuertvfile.wangyuhudong.com" class="download-btn f-fr">下载 APP</a>
	</div>
</template>
<script type="text/javascript">
  	export default {
    	data () {
      		return {
        
      		}
  		},
  		components: {
        	
  		},   
  	}
</script>
<style>
	.download{
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 800px;
		height: 64px;
		padding:0 10px;
		background: #1c232d;
		box-sizing: border-box;
		z-index: 999;
	}
	.download img{
		height: 50px;
		margin-top: 7px;
	}
	.download .download-btn{
		width: 80px;
		height: 34px;
		margin:15px 0;
		text-align: center;
		line-height: 34px;
		border-radius: 5px;
		vertical-align: middle;
		font-size: 1.4rem;
		color:#fff;
		background: #ff3366;
		font-family: Arial;
	}
</style>