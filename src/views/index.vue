<template>
	<div>
		<top-head></top-head>
		<div class="g-bd">
			<div class="m-banner">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="banner in banner">
                            <img v-bind:src="'http://img.wangyuhudong.com/'+banner.img" alt="">
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                </div>   
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    import swiper from '../../static/js/swiper.min.js'
    export default {
        data () {
            return {
                banner:'',
                bannerslides:''
            }
        },
        beforeCreate: function () {
            console.log('beforeCreate is triggered.');
            let mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                // autoplay : 5000,

                // 如果需要分页器
                pagination: '.swiper-pagination',
                observer:true,
                observeParents:true,
            }) 
        },
        mounted: function () {
            this.$nextTick(function () {
                let _this = this; 

                _this.$http.get('/mobile/banner').then(function(response) {
                    _this.banner = response.data.object; 
                    
                },function(response) {
                    console.log(response);
                });

                _this.$http.get('/mobile/index').then(function(response) {
                    console.log(response);
                    
                },function(response) {
                    console.log(response);
                });

                //banner 
                
            })
        },
        components: {
            topHead
        },   
    }
</script>
<style>
    @import '../../static/css/swiper.min.css';
    .swiper-container{
        height: 21rem;
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
    }
</style>