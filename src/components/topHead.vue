<template>
	<div class="g-hd">
    <img src="../../static/images/logo.png" alt="" class="logo">
    <router-link to="/search" class="u-search f-fr"><img src="../../static/images/search.png"></router-link>
		<ul class="m-nav f-fr">
            <router-link tag="li" to="/index" exact><i class="icon iconfont icon-index"></i></router-link>
            <router-link tag="li" to="/collect"><i class="icon iconfont icon-collect"></i></router-link>
            <!-- <router-link tag="li" to="/videos">视频</router-link> -->
		</ul>
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
    .g-hd{
        height: 2rem;
        padding:1rem 10px;
        background: #fff;
    }
    .logo{
        height: 2rem;
        float: left;
    }
    .m-nav{
        height: 2rem;
        line-height: 2rem;
    }
    .m-nav li{
        float: left;
        color:#999;
        margin:0 1.5rem;
    }
    .m-nav .iconfont{
        font-size: 2rem;
    }
    .m-nav .router-link-active{
        color:#1cc7ff;
    }
    .u-search{
        margin-left: 2rem;
    }
    .u-search img{
        height: 1.6rem;
        margin:0.2rem 0;
    }
</style>