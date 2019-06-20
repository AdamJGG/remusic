<template>
	<div class="recent">
		<van-nav-bar class='top' title="本地音乐" right-text="" left-arrow @click-left="onClickLeft" />
		<van-tabs @click="onClick" class='nav'>
			<van-tab title="歌曲">
				<form>
					<van-search id="search" ref="search" v-model="keyWord" shape="round" placeholder="输入歌曲关键字" show-action background="#f0f0f0" @focus="focusFn">
						<div slot="action" @click="search">搜索</div>
					</van-search>
				</form>
				<div class="tags" v-show="isFocus">
					<p>搜索历史</p>
					<ul class="tag-row clearfix">
						<li v-for="(item,index) in searchHistory" :key='index' @click="searchForTag(item)">
							{{item}}</li>
					</ul>
				</div>
				<div class="musicss">
					<ul class="tag-row clearfix">
						<li v-for="(item,index) in searchMusics" :key='index' @click="goState({name:'Playmusic',params:{pid:item.id,item:searchMusics}})">
							<p><b>{{item.name}}</b></p>
							<p class="sing">演唱：{{item.singer}}</p>
						</li>
					</ul>
				</div>
				<van-row></van-row>
			</van-tab>
			<van-tab title="视频">
				<!--<div class="box">
					<video id="video">
						<source src="http://127.0.0.1:8085/MV/综艺大party-张轩睿为任家萱弹吉他唱《奇妙能力歌》，太暖太甜了，张轩睿好赞(超清).mp4" type="video/mp4"></source>
					</video>
					<div id="playbtn" class='control' @click="playVideo">
						<img id="img" src="http://127.0.0.1:8085/images/play.jpg" />
					</div>
					<p>综艺大party-张轩睿为任家萱弹吉他唱《奇妙能力歌》，太暖太甜了，张轩睿好赞</p>
				</div>
				<div class="box">
					<video id="video" controls="controls">
						<source src="http://127.0.0.1:8085/MV/Q音·速报-范丞丞自嘲凭实力单身 私下打扮随意到邋遢(超清).mp4"></source>
					</video>
					<p>Q音·速报-范丞丞自嘲凭实力单身 私下打扮随意到邋遢(超清).mp4</p>
				</div>
				<div class="box">
					<video id="video" controls="controls">
						<source src="http://127.0.0.1:8085/MV/范丞丞-由你音乐榜样-完美！范丞丞《哑剧》吊威亚惊艳全场，唱情歌的丞丞真的超级苏(标清).mp4"></source>
					</video>
					<p>范丞丞-由你音乐榜样-完美！范丞丞《哑剧》吊威亚惊艳全场，唱情歌的丞丞真的超级苏(标清).mp4</p>
				</div>-->
			</van-tab>
			<van-tab title="其他">
				<li class="list" v-for="(item,index) in list" :key="index">
					<img class="auto-img" :src="item.pic" alt="" />
					<span class="desc">{{item.name}}</span>
				</li>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';

	Vue.use(Toast);
	export default {
		name: 'Local',
		data() {
			return {
				list: [],
				keyWord: "偏偏喜欢你",

				searchMusics: [],

				searchHistory: [],

				userId: '',

				isFocus: true

			}
		},
		created() {
			var get = JSON.parse(localStorage.getItem("gedanid")).songs
			this.list = get
			//			this.userId = JSON.parse(localStorage.getItem('userLogin')).userId;	
			var searchHistoryData = localStorage.getItem("searchHistory")
			this.searchHistory = searchHistoryData == undefined ? {} : JSON.parse(searchHistoryData)
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClick(index, title) {

			},
			search() {
				this.isFocus = false;

				if(this.keyWord == '' || this.keyWord == undefined) {
					this.$toast('搜索关键不能为空');
					return;
				}

				var match = new RegExp('(' + this.keyWord + ')', 'img')
				this.searchMusics = []
				//				new RegExp('()')
				var musicData = JSON.parse(localStorage.getItem("gedanid")).data.data.songs
				console.log("musics==>", musicData)
				musicData.forEach(v => {
					if(match.test(v.name)) {
						this.searchMusics.push(v)
						localStorage.setItem("searchMusics", JSON.stringify(this.searchMusics))
					} else {
						this.$toast('此歌曲你还没有存在本地哦！')
					}
				})

				if(!this.searchHistory) {

					this.searchHistory = [];

				} else if(this.searchHistory.length >= 10) {

					this.searchHistory.shift();

				}

				if(this.searchHistory.indexOf(this.keyWord) === -1) {
					this.searchHistory.push(this.keyWord);
					localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
				}

			},
			goState(path) {
				console.log('aaaa')
				this.$router.push(path);
			},
			focusFn() {
				this.isFocus = true;
			},

			searchForTag(keyWord) {
				this.keyWord = keyWord;
				this.search();
			},
			playVideo() {
				var video = document.getElementById("video")
				//				var playbtn = document.getElementById("playbtn")
				var img = document.getElementById('img')

				if(video.paused) {
					video.play()
					img.style.display = "none"
				} else if(video.play) {
					video.pause()
					img.style.display = "block"

				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.recent {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(../../../server/public/images/bg-02.jpg);
		/*background-repeat: repeat;*/
	}
	
	.top {
		position: sticky;
		top: 0;
		left: 0;
	}
	
	.nav {
		position: absolute;
		top: 1.2rem;
		left: 0;
		width: 100%;
		overflow-y: auto;
	}
	
	.van-nav-bar {
		background: #D43C33;
	}
	
	.van-nav-bar .van-icon {
		color: #fff;
		font-size: .6rem;
	}
	
	.van-nav-bar__title {
		color: #fff;
	}
	
	.van-tabs__nav--line {
		background: #D43C33;
	}
	
	.van-tab {
		color: whitesmoke;
	}
	
	.van-tab--active {
		font-weight: 700;
		color: white;
	}
	
	h1 {
		text-align: center;
		font-size: .5rem;
		color: #CCCCCC;
	}
	
	.list {
		display: block;
		list-style: none;
		height: 2rem;
		border-bottom: 1px solid #F0F0F0;
	}
	
	.auto-img {
		width: 1.5rem;
		height: 1.5rem;
		float: left;
		margin: .25rem;
	}
	
	.desc {
		height: 2rem;
		line-height: 2rem;
		float: left;
	}
	
	.tags {
		font-size: 18px;
		color: rgba(0, 0, 0, .8);
		padding: .4rem;
		li {

			
			padding: .1rem;
			border: 0.015rem solid lightgray;
			display: inline-block;
			border-radius: .1rem;
			max-width: 200px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: .2rem;
			font-size: .3rem;
		}
	}
	
	.musicss {
		margin: 0 auto;
		.tag-row {
			width: 100%;
			li {
				/*background: url(../../../server/public/images/bg-02.jpg) repeat-y;*/
				background: #FFFFFF;
				
				height: 1.5rem;
				border-bottom: 1px solid #F0F0F0;
				line-height: .9rem;
				p {
					margin: 0;
					padding-left: .6rem;
					max-width: 260px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 6px;
					color: #D43C33;
					
				}
				.sing{
					font-size: 8px;
					line-height: .3rem;
					color: rgba(0,0,0,.7);
				}
			}
		}
	}
	
	.box {
		width: 98%;
		margin: 0 auto;
		text-align: center;
		position: relative;
		p {
			padding: 0.31rem;
			font-size: 0.2rem;
			color: rgba(0, 0, 0, 0.8);
			background: #Fff;
			/* box-shadow: 0 0 0.1rem grey; */
			max-width: 10.66667rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin: 0
		}
		#video {
			width: 100%;
			height: 100%;
		}
		.control {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			/*background:pink;*/
			img {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 2rem;
				height: 2rem;
			}
		}
	}
</style>