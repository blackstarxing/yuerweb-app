<template>
	<div class="g-hd">
    <img src="../../static/images/logo.png" alt="" class="logo">
    <router-link to="/search" class="u-search f-fr"><img src="../../static/images/search.png" alt=""></router-link>
		<ul class="m-nav f-fr">
            <router-link tag="li" to="/" exact>首页</router-link>
            <router-link tag="li" to="/lives">直播</router-link>
            <router-link tag="li" to="/videos">视频</router-link>
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
        height: 3.1rem;
        padding:0.45rem 10px;
    }
    .logo{
        height: 100%;
        float: left;
    }
    .m-nav{
        height: 3.1rem;
        line-height: 3.1rem;
    }
    .m-nav li{
        float: left;
        font-size: 1.5rem;
        color:#fff;
        margin:0 1.5rem;
    }
    .m-nav .router-link-active{
        color:#f36;
    }
    .u-search{
        margin-left: 2rem;
    }
    .u-search img{
        height: 1.6rem;
        margin:0.75rem 0;
    }
</style>