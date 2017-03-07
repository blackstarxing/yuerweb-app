<template>
	<div>
		<div class="g-bd g-bdsearch">
			<div class="m-s-main">
				<div class="g-s-nav">
					<div class="m-s-nav">
						<img src="../../static/images/nav_search.png" alt="" class="u-s-simg">
						<input type="text" placeholder="可搜索房间号、主播昵称、游戏名称" class="u-s-search">
					</div>
					<router-link  to="/" class="u-s-cancel">取消</router-link>
				</div>
				<div class="g-s-main">
					<div class="u-hs">热门搜索</div>
					<div class="u-hc">王者荣耀</div>
					<div class="u-hc">穿越火线</div>
					<div class="u-hc">球球大作战</div>
					<div class="u-hc">街篮</div>
					<div class="u-hc">炉石传说</div>
					<div class="u-hc">阴阳师</div>
					<div class="u-hc">欢乐斗地主</div>
					<div class="u-hc">蛇蛇大作战</div>
				</div>
			</div>

		</div>
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
	.g-bdsearch{
		height:53.5rem;
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
	.g-s-main{
		height:40rem;
		width:96%;
		margin:0 2%;
		overflow:hidden;
	}
	.u-hs{
		font-size:1rem;
		color:#f36;
		padding:5% 2%;
	}
	.u-hc{
		float:left;
		width:21%;
		height:3rem;
		line-height:3rem;
		color:#8e8e9a;
		font-size:1.2rem;
		background:#1a2129;
		cursor:pointer;
		text-align:center;
		border-radius:2%;
		margin:2% 2%;
	}
	.u-hc:hover{
		border:1px solid #f36;
		color:#f36;
		background:#1a2129;
	}
</style>