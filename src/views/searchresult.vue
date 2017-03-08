<template>
	<div>
		<top-head></top-head>
		<div class="g-bd ">
			<div class="g-main-result">
        <div class="g-s-nav">
          <div class="m-s-nav">
            <img src="../../static/images/nav_search.png" alt="" class="u-s-simg">
            <input type="text" placeholder="可搜索房间号、主播昵称、游戏名称" class="u-s-search">
          </div>
          <router-link  to="/" class="u-s-cancel">取消</router-link>
        </div>  
        <div class="g-s-list">
          <a href="" class="u-sl-total">综合</a>
          <a href="" class="u-sl-live">直播</a>
          <a href="" class="u-sl-host">主播</a>
          <a href="" class="u-sl-vedio">视频</a>
        </div>
        <div class="g-s-live"></div>
        <div class="g-s-host">
          <div class="m-sh-head">
            
          </div>
          <div class="m-sh-label">
            <img src="../../static/images/default.png" alt="" class="u-shl-img">
            <div class="u-shl-tar">
              <p><span></span><img src="../../static/images/rank_male.png" alt=""><img src="../../static/images/auth.png" alt=""></p>
              <p><span>房间</span><span>521463</span><span>粉丝</span><span>8956</span></p>
            </div>
            <div class="u-shl-focus">
              <button>关注</button>
            </div>
          </div>
        </div>
        <div class="g-s-vedio"></div>
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
</style>