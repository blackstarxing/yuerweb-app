<template>
	<div>
		<top-head></top-head>
		<div class="g-bd">
            <div class="g-true">
                <div class="m-top">
                     <p class="u-tcon">当前在线：<span class="u-tspec">28</span>位主播</p>        
                </div>
            </div>
            <!-- <div class="g-false">
                <p class="u-desc">当前没有主播开播，查看更多主播精彩视频</p>
                <router-link  to="/" class="u-switch">查看更多精彩视频</router-link>
            </div> -->
		</div>
	</div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    export default {
        data () {
            return {
                liveshow:'',
                cur_page:'',
                cur_pageSize:'',
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 代码保证 this.$el 在 document 中
                this.download();
            })
        },
        components: {
            topHead
        }, 
        methods: {
            // downloads:function(){
            //     var _this = this;
            //     $.ajax({
            //         method: "GET",
            //         url: " http://172.16.10.134:8777/mobile/liveList",
            //         dataType: 'json',
            //         data: {
            //             page: _this.cur_page,
            //             pageSize: _this.pageSize,
            //         }, 
            //         success: function(data) {
            //             if (data.code == 0) { 
            //                 _this.liveshow = data.object; 
            //                 if(data.code.isLast==1)
            //                 // 是最后一页
            //                 else{
                                //不是最后一页
            //                 }        
            //             } else {
            //                 console.log(data.result);
            //             }
            //         },
            //         error: function(a, b, c) {
            //             console.log("接口出问题啦");
            //         }
            //     })
            // },
        }, 
    }
</script>
<style>
    .g-bd{
        width:96%;
        height:49.3rem;
        margin:0 2%;
        background:#141a20;
    }
    .m-top{
        height:3rem;
        line-height:3rem;
    }
    .u-tcon{
        font-size:1.5rem;
        color:#d0d1d2;
    }
    .u-tspec{
        color:#f36;
        margin-right:2%;
    }
</style>