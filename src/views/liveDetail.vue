<template>
	<div>
		<top-head></top-head>
	    <download></download>
	    <div class="m-player">
			<video width="100%" id="player" v-bind:poster="details.icon" controls="controls" autoplay="" webkit-playsinline playsinline v-if="details.state">
			    <source type="application/x-mpegURL" v-bind:src="liveAddress" />
			</video>
			<div class="m-outline" v-else>
				<p>主播当前不在线，查看更多直播</p>
				<div class="other-wrap f-cb">
					<router-link :to="{path:live.type==1?'liveDetail':'videoDetail',query: {id:live.id}}" class="otherlive f-fl" v-for="live in otherlive">
						<img v-bind:src="live.icon" alt="">
					</router-link>
				</div>				
			</div>
		</div>	
		<div class="tab">
			<ul>
				<li v-for='(item,index) in tab' v-text="item.name" v-bind:class="{current:item.isCur}" @click="setCur(index)"></li>
			</ul>
		</div>
		<div class="m-comments" v-show="index=='0'">
			<div class="comment anchor">
				<div class="subscribe clearfix">
					<div class="head f-fl">
						<img v-bind:src="details.user_icon" alt="" v-if="details.user_icon">
						<img src="../../static/images/default.png" alt="" v-else>
                        <img src="../../static/images/female.png" alt="" class="sex" v-if="details.sex">
                        <img src="../../static/images/male.png" alt="" class="sex" v-else>
					</div>
					<div class="name f-fl">
						<h4>{{details.nickname}}</h4>
						<div>房间号&nbsp;&nbsp;&nbsp;<span style="margin-right: 25px;">{{details.room_id}}</span>粉丝&nbsp;&nbsp;&nbsp;<span class="fans-num">{{details.fans}}</span></div>
					</div>
					<a href="https://yuertvfile.wangyuhudong.com" class="follow"><img src="../../static/images/follow.png" alt="">关注</a>
				</div>
				<div class="intro">
					<h3><img src='../../static/images/welcome.png' alt=''>直播公告</h3>
					<p v-html="details.notice?details.notice:'主播很懒，什么都没留下'"></p>
				</div>
			</div>
		</div>
		<div class="m-comments" v-show="index=='1'">
			<a href="https://yuertvfile.wangyuhudong.com" class="follow"><img src="../../static/images/follow.png" alt="">关注</a>
			<div id="chat">
				
			</div>
		</div>
		<div class="m-comments" v-show="index=='2'">
			<ul class="contribute-tab f-cb">
				<li v-for='(item,index) in contributionTab' v-text="item.name" v-bind:class="{current:item.isCur}" @click="setContributionCur(index)"></li>
			</ul>
			<div class="empty" v-if="contributionRank == ''">
				<img src="../../static/images/empty.png" alt="">
			</div>
			<div class="rank" v-else>
				<div class="contributionRank f-cb" v-for="(contribution,index) in contributionRank">
					<div class="bank-left f-fl">
						<span class="rank-index">{{index+1}}</span>
						<div class="bank-head">
							<img v-bind:src="contribution.icon" alt="" v-if="contribution.icon">
							<img src="../../static/images/default.png" alt="" v-else>
						</div>
						<span class="rank-name">{{contribution.nickname}}</span> 
						<i class="icon iconfont icon-female rank-sex" v-if="contribution.sex"></i>
                        <i class="icon iconfont icon-male rank-sex" v-else></i>
					</div>
					<div class="bank-right f-fr">
						<div class="rank-detail">
							<p v-if="contribution.yuer_coin"><span class="yuer-coin">{{contribution.yuer_coin}}</span>鱼币</p>
							<p v-if="contribution.bait"><span>{{contribution.bait}}</span>鱼饵</p>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="m-comments" v-show="index=='3'">
			<div class="comment overlook">
                <div class="empty" v-if="historyVideo == ''">
					<img src="../../static/images/empty.png" alt="">
				</div>
    			<div v-else>
					 <div class="m-lst" v-for="video in historyVideo">
                        <router-link :to="{path:'videoDetail',query: {id:video.id}}" class="m-livelink">
                            <div class="m-cover">
                                <img v-bind:src="video.icon" alt="" class="screen" v-if="video.screen">
                                <img v-bind:src="video.icon" alt="" v-else>
                                <span v-bind:style="'background:'+video.tag_color">{{video.game_name}}</span>
                            </div>
                            <div class="m-info m-video-info f-cb">
                                <div class="m-nickname f-fl">{{video.nickname}}</div>
                                <img src="../../static/images/female.png" alt="" class="sex f-fl" v-if="video.sex">
                                <img src="../../static/images/male.png" alt="" class="sex f-fl" v-else>
                                <span class="f-fr">{{watchPeople(video.play_times)}}</span>
                            </div>
                            <div class="m-title">{{video.title}}</div>
                        </router-link>
                    </div>
    			</div>                   
			</div>
		</div>
	</div>	
</template>
<script type="text/javascript">
	import topHead from '../components/topHead.vue'
    import download from '../components/download.vue'
    // import base from '../../static/js/Web_SDK_Base_v2.8.0.js'
    // import chatroom from '../../static/js/Web_SDK_Chatroom_v2.8.0.js'
  	export default {
    	data () {
      		return {
        		details:'',
        		historyVideo:'',
        		otherlive:'',
        		liveAddress:'',
        		roomid:'',
        		accid:'',
        		live_account:'',
        		live_token:'',
        		tab:[{
        			name:'信息',
        			isCur:false
        		},
        		{
        			name:'聊天',
        			isCur:true
        		},
        		{
        			name:'排行',
        			isCur:false
        		},
        		{
        			name:'往期',
        			isCur:false
        		}],
        		// tab索引
        		index:1,
        		// 贡献榜
        		contributionTab:[{
        			name:'周贡献榜',
        			isCur:true
        		},{
        			name:'总贡献榜',
        			isCur:false
        		}],
        		contributionRank:'',
        		islast:'',
        		page:1,
      		}
  		},
  		mounted: function () {
            this.$nextTick(function () {
            	this.getDetail();               
            })
        },
        methods:{
        	getDetail : function(){
        		let _this = this;
        		_this.page = 1;
                // 获取直播间详情数据
                _this.$http.get('/api/mobile/liveDetail',{params:{id:_this.$route.query.id,page:_this.page,pageSize:5}}).then(function(response) {
                    _this.details = response.data.object.info;
                    _this.liveAddress = _this.details.rtmp ? _this.details.rtmp.replace(/rtmp:/, "http:").replace(/rtmp/, "hls")+'.m3u8':'';       
                    _this.roomid = _this.details.chat_room_id;   
                    _this.accid = _this.details.up_user_id; 
                    _this.historyVideo = response.data.object.historyVideo.list; 
                    _this.otherlive = response.data.object.otherLive ? response.data.object.otherLive : '';
                    _this.islast = response.data.object.historyVideo.isLast;

                    // 获取聊天室游客id
                    _this.$http.get('/api/mobile/visitor').then(function(response) {
	                    _this.live_account = response.data.object.accid;
			            _this.live_token = response.data.object.token;
			            // 云信聊天室初始化
			            _this.enterLiveroom();                  
	                },function(response) {
	                    console.log(response);
	                });
    
                },function(response) {
                    console.log(response);
                });

                // 动态设置聊天区域高度
				let height=$(window).height()-366;
				$('#chat').css('height',height+'px');
				$(window).scroll(function(){ 
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
                    if($(document).height() <= totalheight){
                        if(!_this.islast){
                        	_this.page+=1;
                            _this.$http.get('/api/mobile/liveDetail',{params:{id:_this.$route.query.game_id,page:_this.page,pageSize:5}}).then(function(response) {
                            	_this.islast = response.data.object.historyVideo.isLast;
                            	_this.historyVideo=_this.historyVideo.concat(response.data.object.historyVideo.list);
	                        },function(response) {
			                    console.log(response);
			                });
                        }
                        
                    }
                })
        	},
        	// tab切换
            setCur : function(index){
            	this.tab.map(function (v,i) {
			        i==index? v.isCur=true: v.isCur=false;
			    });
			    this.index = index ;
			    if (this.index=='2') {
			    	this.getContribution(0);
			    }
            },
            // 贡献榜切换
            setContributionCur : function(index){
            	this.contributionTab.map(function (v,i) {
			        i==index? v.isCur=true: v.isCur=false;
			    });
			    this.getContribution(index);
            },
            // 获取贡献榜
            getContribution : function(index){
            	var _this = this;
            	index = parseInt(index+1);
            	// 礼物排行
                _this.$http.get('/api/mobile/contributionRank',{params:{type:index,upUserId:_this.accid}}).then(function(response) {
                    _this.contributionRank = response.data.object;                   
                },function(response) {
                    console.log(response);
                });
            },
            watchPeople: function (num) {
              	// `this` points to the vm instance
              	return num>10000 ? (num/10000).toFixed(1)+'万' : num;
            },
            // 进入聊天室
            enterLiveroom : function(){
            	let _this = this;
            	// 聊天室服务器地址
				let address=[];
				let lct = document.getElementById('chat');
				// 当前时间
				let myDate = new Date(),
					y = myDate.getFullYear(),   //获取完整的年份(4位,1970-????)
					m = myDate.getMonth()+1,      //获取当前月份(0-11,0代表1月)
					d = myDate.getDate(),       //获取当前日(1-31)
					h = myDate.getHours(),      //获取当前小时数(0-23)
					mi = myDate.getMinutes(),    //获取当前分钟数(0-59)
					s = myDate.getSeconds();   //获取当前秒数(0-59)
				let CurTime = Date.UTC(y,m,d,h,mi,s);
				let roomid = parseInt(4174310);
				let shaObj = new jsSHA("SHA-1", "TEXT");
				// AppSecret
				shaObj.update('1981023862be'+1+CurTime);
				let hash = shaObj.getHash("HEX");

				// 获取聊天室信息重要参数
				let appKey = '5585496885932f31d478ed0222072bcf';

				$.ajax({
				    url: "https://api.netease.im/nimserver/chatroom/requestAddr.action",
				    contentType:"application/x-www-form-urlencoded;charset=utf-8",
				    type: 'POST',
				    beforeSend: function (req) {
				        req.setRequestHeader('appkey', appKey);
				        req.setRequestHeader('Nonce',1);
				        req.setRequestHeader('CurTime',CurTime);
				        req.setRequestHeader('CheckSum',hash);
				    },
				    data:{roomid:_this.roomid,accid:_this.accid}
				}).done(function(data) {
				    if(data.code===200){
				       address = data.addr;
				       getChat();
				    }else{
				        // alert("获取连接房间地址失败");
				        $('#chat').append("<div>获取连接房间地址失败!<div>"); 
				    }   
				})
				function getChat(){
					let chatroom = Chatroom.getInstance({
					    appKey: appKey,
					    account: _this.live_account,
					    token: _this.live_token,
					    chatroomId: _this.roomid,
					    chatroomAddresses: address,
				        onconnect: onChatroomConnect,
					    onerror: onChatroomError,
					    onwillreconnect: onChatroomWillReconnect,
					    ondisconnect: onChatroomDisconnect,
					    // 消息
					    onmsgs: onChatroomMsgs
					});
				}


				function onChatroomConnect(chatroom) {
				    console.log('进入聊天室', chatroom);
				    $('#chat').append("<div><span class='bubble s-bl'><img src='../../static/images/welcome.png' alt=''>欢迎来到<span class='nick'>"+_this.details.nickname+"</span>的直播间，喜欢主播别忘点关注哦！</span></div>"); 
				}
				function onChatroomWillReconnect(obj) {
				    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
				    console.log('即将重连', obj);
				}
				function onChatroomDisconnect(error) {
				    // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
				    console.log('连接断开', error);
				    if (error) {
				        switch (error.code) {
				        // 账号或者密码错误, 请跳转到登录页面并提示错误
				        case 302:
				            break;
				        // 被踢, 请提示错误后跳转到登录页面
				        case 'kicked':
				            break;
				        default:
				            break;
				        }
				    }
				    $('#chat').append("<div><span class='bubble'>连接断开</span></div>"); 
				}
				function onChatroomError(error, obj) {
				    console.log('发生错误', error, obj);
				}
				function onChatroomMsgs(msgs) {
				    console.log('收到聊天室消息', msgs);
				    // $('.chat').html(msgs)
				    for(let i=0;i<msgs.length;i++){
				    	if(msgs[i].content){
				    		let content=JSON.parse(msgs[i].content);
				    		// console.log(content);
				    		if(content.data.giftNum>1){
				    			$('#chat').append("<div class='gift'><span class='bubble'><span class='s-bl'>"+content.data.senderName+"</span>赠送给主播<span class='s-f36'>"+content.data.giftName+"</span><img src='"+content.data.giftShowImage+"' class='gift-icon' alt=''><span class='combo'>x"+content.data.giftNum+"</span></span><div>");
				    		}else{
				    			$('#chat').append("<div class='gift'><span class='bubble'><span class='s-bl'>"+content.data.senderName+"</span>赠送给主播<span class='s-f36'>"+content.data.giftName+"</span><img src='"+content.data.giftShowImage+"' class='gift-icon' alt=''></span><div>");
				    		}
				    	}else if(msgs[i].text && msgs[i].fromNick && msgs[i].fromClientType != 'Server'){
				    		let host = msgs[i].fromNick=="1" ? '<label for="">主播</label>&nbsp;' : '';
							$('#chat').append("<div><span class='bubble'>"+host+"<span class='fromNick'>"+msgs[i].fromNick+":&nbsp;&nbsp;</span>"+msgs[i].text+"</span><div>");   		
				    	}else if(msgs[i].text && !msgs[i].fromNick && msgs[i].custom){
				            let custom=JSON.parse(msgs[i].custom);
				            $('#chat').append("<div><span class='bubble'><span class='fromNick'>"+custom.nickname+":&nbsp;&nbsp;</span>"+msgs[i].text+"</span></div>");        
				        }else if(msgs[i].flow=="in" && !msgs[i].text && msgs[i].attach.fromNick && msgs[i].attach.type=="memberEnter"){
				    		$('#chat').append("<div><span class='bubble'>欢迎用户"+msgs[i].attach.fromNick+"进入直播间</span></div>");
				    	}else if(msgs[i].flow=="in" && msgs[i].text && msgs[i].custom =="" ){
				    		var a = msgs[i].text.slice(0,2);
				    		var b = msgs[i].text.slice(2).slice(0,-5);
				    		var c = msgs[i].text.slice(2).slice(-5);
				            $('#chat').append('<div><span class="bubble">'+a+'<span class="s-bl">'+b+'</span>'+c+'</span></div>');
				        }
				    	lct.scrollTop=Math.max(0,lct.scrollHeight-lct.offsetHeight);    	
				    }
				}
            }
        },
        watch: {
        	"$route": "getDetail"
        },
  		components: {
        	topHead,
            download
  		},   
  	}
</script>
<style>
	.m-player video,
	.m-outline{
		height: 18rem;
	}
	.m-outline{
		background: #000;
		color:#cecfd2;
		font-size: 1.3rem;
	}
	.m-outline p{
		padding-top: 5rem;
		margin-bottom: 10px;
		text-align: center;
	}
	.other-wrap{
		width: 60%;
		margin:0 auto;
	}
	.otherlive{
		width: 44%;
		height: 5rem;
		margin:0 3%;
		border:1px solid #fff;
		box-sizing: border-box;
	}
	.otherlive img{
		width: 100%;
		height: 100%;
	}
	.tab{
		height: 39px;
		line-height: 39px;
		padding-bottom: 3px;
		background: #fff;
		/*border-bottom: 1px solid #e4e4e4;*/
	}
	.tab ul{
		width: 80%;
		margin:0 auto;
	}
	.tab li{
		float: left;
		width: 15%;
		text-align: center;
		margin:0 5%;
		display: block;
		box-sizing: border-box;
		color: #666;
		font-size: 13px;
	}
	.tab li.current{
		color: #1cc7ff;
		background: url(../../static/images/current.png) center 35px no-repeat;
		background-size: 1.83rem;
	}
	.follow{
		position: absolute;
		top:1rem;
		right: 0;
		display: block;
		width: 5rem;
		height: 3rem;
		line-height: 3rem;
		background: #1cc7ff;
		text-align: center;
		color:#fff;
		font-size: 13px;
		padding:0 5px;
		border-top-left-radius: 1.5rem;
		border-bottom-left-radius: 1.5rem;
		-webkit-box-shadow: 0px 2px 10px rgba(71,202,255,.7);
	    -moz-box-shadow: 0px 2px 10px rgba(71,202,255,.7);
	    box-shadow: 0px 2px 10px rgba(71,202,255,.7);
	}
	.follow img{
		width: 14px;
		vertical-align: text-bottom;
		margin-right: 5px;
	}
	/*评论区域*/
	.m-comments{padding:0 0 70px;color:#9da4ad;position: relative;}
	.m-comments .comment{padding:12px 12px 0;}
	.showItem,.showRank{display: block;}
	.m-comments .comment .head{width:30px;}
	.m-comments .comment .head img{width: 30px;height:30px;background: #ccc;border-radius: 50%;}
	.m-comments .subscribe .head,.subscribe .head{width:49px;margin-right: 9px;}
	.m-comments .subscribe .head img,.subscribe .head img{width: 49px;height:49px;background: #ccc;border-radius: 50%;}
	.m-comments .comment .words{margin-left:40px;font-size: 0.9375rem;border-bottom: 1px solid #e4e4e4;}
	.m-comments .comment:last-child .words{border-bottom: none;}
	.m-comments .comment .words .name{color:#334f8b;margin-bottom: 15px;}
	.m-comments .comment .words .time{color:#9a9a9a;font-size: 0.75rem;margin:8px 0 12px;}
	.m-comments .comment .words .more{background: #1c232d;padding:10px;border-radius: 5px;border: 1px solid #1c232d;position: relative;}
	.m-comments .comment .words .more:before{position: absolute;top:-10px;content: "";width: 0;height: 0;border-left: 8px solid transparent;border-right: 8px solid transparent;border-bottom: 10px solid #1c232d;}
	.m-comments .comment .words .more:after{position: absolute;top:-8px;content: "";width: 0;height: 0;border-left: 8px solid transparent;border-right: 8px solid transparent;border-bottom: 10px solid #1c232d;}
	.m-comments .comment .words .more span{color:#334f8b;}

	.m-comments .anchor,
	.m-comments .overlook{
		padding:0;
		margin-top: 12px;
	}
	.m-comments .anchor{
		background: #f5f5f5;
		margin:10px;
		/*border-top:1px solid #e4e4e4;
		border-bottom:1px solid #e4e4e4;*/
	}
	.subscribe{
		height: 46px;
		padding:15px;
		background: #fff;
		/*border-bottom:1px solid #e4e4e4;*/
	}
	.subscribe .name{
		font-size: 13px;
		color: #465667;
	}
	.subscribe .head{
		position: relative;
	}
	.subscribe .head img.sex{
		position: absolute;
		width: 15px;
		height: 15px;
		right: 0;
		bottom: 3px;
	}
	.subscribe .name h4{
		font-size: 15px;
		color:#333;
		margin-bottom: 15px;
		width: 170px;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
	.subscribe .name span.fans-num{
		color: #ff3366;
	}
	.subscribe .sub{
		display: inline-block;
		font-weight: bold;
		margin-top: 11px;
		padding:0 8px;
		border:1px solid #ff3366;
		border-radius: 2px;
		color:#ff3366;
		line-height: 24px;
		margin-right: 9px;
	}
	.subscribe .follow{
		border-radius: 1.5rem;
		top:50%;
		margin-top: -1.5rem;
		right:10px;
	}
	.anchor .intro{
		padding:12px 15px 15px;
		font-size: 14px;
		line-height: 23px;
		color: #9a9a9a;
		background: #1c232d;
		margin-top: 10px;
	}
	.anchor .intro h3{
		font-size: 16px;
		margin-bottom: 10px;
	}
	.anchor .intro h3 img{
		width: 15px;
		vertical-align: middle;
		margin-right: 8px;
	}
	/*聊天室*/
	#chat{
		overflow: auto;
		padding:10px 10px 0;
		box-sizing: border-box;
		line-height: 20px;
		font-size: 1rem;
	}
	#chat .bubble{
		background: #fff;
		display: inline-block;
		padding:0.6rem 1.2rem;
		line-height: 1.6rem;
		margin-bottom: 1rem;
		border-radius: 1.4rem;
		border-bottom-left-radius: 0;
	}
	.bubble img{
		height: 1.2rem;
		vertical-align: middle;
		margin-right: 8px;
	}
	.bubble .s-bl{
		margin:0 5px;
	}
	.bubble .nick{
		margin:0 5px;
		font-weight: bolder;
	}
	.bubble .gift-icon{
		vertical-align: text-bottom;
		margin-right: 0;
	}
	#chat .gift{
		/*color:#ffff00;*/
	}
	#chat .combo{
		font-size: 14px;
		margin-left: 5px;
		/*font-style: italic;*/
		color:#f36;
		/*font-weight: bolder;*/
	}
	#chat .combo i{
		display: inline-block;
		background: url(../../static/images/combo.png) center center no-repeat;
		background-size: 100%;
		width:42.5px;
		height: 20px;
		vertical-align: bottom;
	}
	#chat .fromNick{
		color:#1cc7ff;
	}
	#chat label{
		display: inline-block;
		height: 13px;
		line-height: 13px;
		color:#fff;
		background: #fd3364;
		padding:1px 3px;
		border-radius: 3px;
	}
	/*排行榜*/
	.contribute-tab{
		width: 75%;
		margin:18px auto;
	}
	.contribute-tab li{
		float: left;
		width: 50%;
		border:1px solid #1cc7ff;
		height: 30px;
		line-height: 30px;
		text-align: center;
		box-sizing: border-box;
		font-size: 15px;
		color:#1cc7ff;
	}
	.contribute-tab li:first-child{
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px; 
	}
	.contribute-tab li:nth-child(2){
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px; 
	}
	.contribute-tab .current{
		background: #1cc7ff;
		color:#fff;
	}
	.contributionRank{
		height: 76px;
		background: #fff;
		color:#333;
		margin-bottom: 11px;
		font-size: 15px
	}
	.bank-left{
		line-height: 76px;
	}
	.rank-name{
		display: inline-block;
		width: 100px;
		line-height: 76px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		float:left;
	}
	.rank-index{
		float: left;
		display: inline-block;
		width: 30px;
		text-align: center;
	}
	.bank-head{
		width: 46px;
		height: 47px;
		margin-top: 12px;
		margin-right: 5px;
		float: left;
	}
	.contributionRank:first-child .bank-head{
		background: url('../../static/images/first.png') top left no-repeat;
		background-size: 20px 20px;
	}
	.contributionRank:first-child img{
		border:1px solid #ff0;
	}
	.contributionRank:nth-child(2) .bank-head{
		background: url('../../static/images/second.png') top left no-repeat;
		background-size: 20px 20px;
	}
	.contributionRank:nth-child(2) img{
		border:1px solid #c6e3f0;
	}
	.contributionRank:nth-child(3) .bank-head{
		background: url('../../static/images/third.png') top left no-repeat;
		background-size: 20px 20px;
	}
	.contributionRank:nth-child(3) img{
		border:1px solid #d2876c;
	}
	.bank-head img{
		margin-top: 9px;
		margin-left: 8px;
		width:36px;
		height: 36px;
		border-radius: 50%;
	}
	.bank-left .rank-sex{
		display: inline-block;
		vertical-align: middle;
		margin-left: 10px;
	}
	.bank-right{
		position: relative;
		height: 100%;
		width: 30%;
	}
	.bank-right span{
		color:#f36;
		/*display: inline-block;*/
		margin-right: 10px;
	}
	.rank-detail{
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    margin: auto;
	    display: table;
	    text-align: center;
	}
	.rank-detail p{
		margin:10px 0;
	}
	.rank-detail span{
		color: #f36;
	}
	.rank-detail .yuer-coin{
		color: #ff9e2c;
	}
	/*播放*/
	.videolist{
		margin-bottom: 10px;
	}
	.videolist a{
		display: block;
		padding:12px;
		background: #242d3c;
		/*border-bottom: 1px solid #e4e4e4;*/
	}
	.videolist .history{
		width: 140px;
		height: 78px;
		border-radius: 4px;
		margin-right: 12px;
		background: url('../../static/images/cover.png') no-repeat;
    	background-size: cover;
	}
	.history img{
		width: 100%;
		height: 100%;
	}
	.history .screen{
		height: 100%;
		width: auto;
		margin:0 auto;
		display: block;
	}
	.videolist .title{
		width: 50%;
	}
	.videolist h3{
		font-size: 14px;
		line-height: 25px;
		margin-bottom: 35px;
		color:#9da4ad;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.videolist label{
		display: inline-block;
		color:#9a9a9a;
		width: 70px;
	}
	.videolist i{
		display: inline-block;
		vertical-align: bottom;
		width: 15px;
		height: 15px;
		margin-right: 12px;
		/*background: url(../../static/images/video.png) no-repeat;*/
		background-size: 100%;
	}
	.videolist i.discuss{
		/*background: url(../../static/images/comment.png) no-repeat;*/
		background-size: 100%;
	}
	.empty{
		text-align: center;
	}
	.empty img{
		width: 50%;
		margin-top: 25px;
		margin-bottom: 20px;
	}
</style>