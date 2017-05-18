<template>
    <div>
        <top-head></top-head>
        <download></download>
        <div class="g-container">
            <div class="g-top m-bg">
                {{info.title}} 
            </div>
            <div class='g-nav m-bg'>
                <span class="g-n-date">{{m}}月{{d}}日</span><span class="g-n-time">{{time}}</span><span class="g-n-title">{{info.game_name}}</span>
                <div class="g-n-line"></div>
            </div>
            <div class="g-mian m-bg">
            </div>
            <div class="g-comment">
                <h3 class="u-title"><img src="../../static/images/comment_icon.png" alt="">评论</h3>
                <div v-if="comments.length>0 ">
                    <div v-for="(list,index) in comments">
                        <a href="https://yuertvfile.wangyuhudong.com/" class="comment news-comment f-cb">
                            <img v-bind:src="list.icon" alt="" class="f-fl" v-if="list.icon">
                              <img src="../../static/images/default.png" alt="" class="f-fl" v-else>
                            <div class="comment-content">
                                <h3>{{list.nickname}} <span class="f-fr">{{list.create_date}}</span></h3>
                                <div>
                                    <span v-if="list.reply_nickname">回复<span class="reply-nickname">@{{list.reply_nickname}}</span>:</span>{{list.content}}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="u-empty" v-else>
                    <img src="../../static/images/empty_icon.png" alt="" class="u-empty-img">
                    <p class="u-empty-data">还没有评论数据</p>
                </div>
            </div>
            <a href="https://yuertvfile.wangyuhudong.com/" class="g-bt">
                <ul class="f-cb">
                    <li><img src="../../static/images/comment.png" alt=""><span v-if="info.comment_num==0"></span><span v-else>{{info.comment_num}}</span><i></i></li>
                    <li><img src="../../static/images/like.png" alt=""><span v-if="info.praise_num==0"></span><span v-else>{{info.praise_num}}</span></li>
                </ul>
            </a>
        </div>
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
                id:'',
                info:[],
                comments:[],
                month:'',
                day:'',
                time:'',
                date:'',
                m:'',
                d:''
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let _this = this;
                // 获取banner数据
                _this.$http.get('/api/news/share?id='+_this.$route.query.id).then(function(response) {
                    console.log(response.data.object);
                    _this.all=response.data.object;
                    _this.info=response.data.object.newsInfo,
                    _this.comments=response.data.object.comment,
                    _this.month=response.data.object.newsInfo.create_date.split('-')[1];
                    _this.day=response.data.object.newsInfo.create_date.substr(8,2);
                    _this.time = response.data.object.newsInfo.create_date.substr(11,5);
                    _this.date = new Date(response.data.object.newsInfo.create_date);
                    _this.m = _this.date.getMonth() + 1,
                    _this.d = _this.date.getDate();   
                },function(response) {
                    console.log(response);
                });
            })
        },
        methods:{
            watchPeople: function (num) {
              return num>10000 ? (num/10000).toFixed(1)+'万' : num;
            },
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
    .g-container{
        padding-bottom:64px;
    }
    li{ list-style:none;}
    h3{font-size: 1.5rem;line-height: 1.25;}
    a{text-decoration: none; color:#9da4ad;}
    .m-bg{
        background:#fff;
        padding:10px 2.5% 25px;
    }
    .g-top{
        font-size:21px;
        color:#333;
        padding-bottom: 15px;
    }
    .g-nav{
        font-size:10px;
        color:#465667;
    }
    .g-n-date{
        margin-right:5%;
        color:#999;
    }
    .g-n-time{
        color:#999;
    }
    .g-n-title{
        display:inline-block; 
        width:20%;
        height:20px;
        line-height:20px;
        text-align:center;
        margin-right:0.2%;
        font-size:9px;
        color:#00a3ff;
        border:1px solid #00a3ff;
        position:absolute;
        right:2.5%;
        left:auto;
        border-radius: 2px;
        white-space:nowrap;/* 不换行 */
        overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/ 
    }
    .g-n-line{
        border:1px solid #e6e6e6;
        margin-top:5%;
    }
    .g-mian{
        font-size:12px;color:#fff;
    }
    .g-mian img{
        max-width: 100%;
        height: auto!important;
    }
    .g-m-video{
        margin:5% 0;
    }
    .g-comment{
        background:#f5f5f5;
        padding:12px 12px 3.5rem;
    }
    .u-title{
        font-size: 1rem;
        color:#666;
    }
    .u-title img{
        height: 1rem;
        vertical-align: middle;
        margin-right: 5px;
    }
    .comment{
        display:block;
        border-top: 1px solid #e6e6e6;
        padding:9px 0;
        font-size: 1.2rem;
    }
    .news-comment img{
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 50%;
        margin-right: 10px;
    }
    .comment-content{
        width: 100%;
        padding-left: 4rem;
        box-sizing: border-box;
    }
    .comment-content h3{
        font-size: 1.2rem;
        color:#333;
        width:50%;
        white-space:nowrap;/* 不换行 */
        overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }
    .comment-content h3 span{
        font-size: 0.9rem;
        color:#999;
    }
    .reply-nickname{
        color: #1cc7ff;
    }
    img.u-empty-img{
        display:block;
        width:45%;
        margin:0 auto;
    }
    img.f-fl{float:left;}
    span.f-fr{
        float:right;
    }
    .u-empty-data{
        font-size:14px;
        color:#fff;
        text-align:center;
        margin-top:5px;
    }
    .g-bt{
        position: fixed;
        bottom: 64px;
        background: #fff;
        width: 100%;
        padding:1rem 0;
        color:#999;
    }
    .g-bt li{
        float: left;
        width: 50%;
        height: 1.5rem;
        text-align: center;
    }
    .g-bt li i{
        display: inline-block;
        float: right;
        font-style: normal;
        width: 1px;
        height: 100%;
        background: #666;
    }
    .g-bt li img{
        height: 100%;
        vertical-align: middle;
        margin-right: 5px;
    }
</style>