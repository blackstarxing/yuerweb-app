<template>
	<div>
		<top-head></top-head>
        <download></download>
		
    </div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    import download from '../components/download.vue'
    export default {
        data () {
            return {
                banner:'',
                index:'',
                loaded:false,
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let _this = this;

                // 获取banner数据
                _this.$http.get('/api/news/share?id='+_this.$route.query.id).then(function(response) {
                    
                },function(response) {
                    console.log(response);
                });
            })
        },
        methods:{
            watchPeople: function (num) {
              // `this` points to the vm instance
              return num>10000 ? (num/10000).toFixed(1)+'万' : num;
            }
        },
        computed: {

        },
        components: {
            topHead,
            download
        },   
    }
</script>
<style>
    @import '../../static/css/swiper.min.css';
    .m-banner .swiper-container{
        height: 13.4rem;
        color:#fff;
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #1cc7ff;
    }
</style>