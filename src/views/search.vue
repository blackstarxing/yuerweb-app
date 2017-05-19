<template>
	<div>
		<download></download>
		<div class="g-bd g-bdsearch">
			<div class="m-s-main">
				<div class="g-s-nav">
					<router-link  to="/" class="u-s-cancel">取消</router-link>
					<div class="m-s-nav">
						<button class="u-s-simg" @click="searchs(keyword)">搜索</button>
						<input type="text" placeholder="可搜索房间号、主播昵称、游戏名称" class="u-s-search" v-model="keyword" @keyup.enter="searchs(keyword)">
					</div>
				</div>
				<div class="g-s-main">
					<div class="u-hs">热门搜索</div>
					<div v-for="(item,index) in hotsearch" @click="searchs(item.content,0)"  class="u-hc">{{item.content}}</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script type="text/javascript">
	import download from '../components/download.vue'
	export default {
        data () {
    		return {
    			keyword:'',
    			type:0,
    			hotsearch:'',
    			contents:''
    		}
		},
		mounted:function(){
        	this.$http.get('/api/mobile/hotSearchTag').then(function(response) {
                    this.hotsearch = response.data.object;  
                    this.contents = this.hotsearch.content;
                },function(response) {
                    console.log(response);
                });
      	},
		components: {
      		download
		},  
		methods:{
			searchs:function(keyword,type) {
				var _this = this;
				if(keyword){
					_this.$router.push({
		                path: '/searchresult?keyword='+keyword
		            });
				}
                	
            },
		} 
	}
</script>
<style>
	.g-bdsearch{
		height:100%;
		width:100%;
		padding-bottom:64px;
	}	
	.g-s-nav{
		width:100%;
		height:3.7rem;
		background:#fff;
		overflow:hidden;
	}
	.m-s-nav{
		position:relative;
		float:right;
		width:80%;
		height:2.8rem;
		line-height:2.8rem;
		text-align:center;
		margin-right:2.5%;
	}
	input.u-s-search{
		width:90%;
		height:2.5rem;
		line-height:2.5rem;
		margin:2.5% 0% 0% 0%;
		background:#f5f5f5;
		border:0px;
		border-radius:2%;
		color:#333;
    	font-size:15px;
    	padding-left:10px;
	}
	input::-webkit-input-placeholder { /* WebKit browsers */ 
		font-size:1.2rem;
    	color: #999; 
	} 
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		font-size:1.2rem;
	    color: #999; 
	} 
	input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		font-size:1.2rem;
	    color: #999; 
	} 
	input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
		font-size:1.2rem;
	    color: #999; 
	} 
	.u-s-simg{
		display:inline-block;
	    position:absolute;
	    width:50px;
	    height:30px;
	    line-height:30px;
	    background:#1cc7ff;
	    color:#fff;
	    top:23%;
	    right:5px;
	    border-radius:5px;
	    border:1px solid #1cc7ff;
	}
	.u-s-cancel{
		display:inline-block;
		width:10%;
		height:10%;
		line-height:10%;
		text-align:center;
		font-size:1.5rem;
		color:#666;
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
		color:#1cc7ff;
		padding:5% 2% 3% 2%;
	}
	.u-hc{
		float:left;
		width:20%;
		height:3rem;
		line-height:3rem;
		color:#666;
		font-size:1.2rem;
		background:#fff;
		cursor:pointer;
		text-align:center;
		border-radius:2%;
		margin:2% 2%;
	}
	.u-hc:link{
		color:#666;
		background:#fff;
	}
	.u-hc:visited{
		border:1px solid #1cc7ff;
		color:#1cc7ff;
		background:#fff;
	}
	.u-hc:hover{
		border:1px solid #1cc7ff;
		color:#1cc7ff;
		background:#fff;
	}
	.u-hc:active{
		border:1px solid #1cc7ff;
		color:#1cc7ff;
		background:#fff;
	}
</style>