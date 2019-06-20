<template>
	<div class="playmusic">
		<div class="bgimg">
			<img :src="currentSong.pic" />
		</div>
		<!--头部导航栏-->
		<van-row class='playtitle'>
			<van-col span="3">
				<div @click="onClickLeft">
					<van-icon name='arrow-left'></van-icon>
				</div>
			</van-col>
			<van-col span="18" class='middle'>{{title}}<br/> 演唱：
				<b style="color: #D43C33;">{{singer}}</b>
			</van-col>
			<van-col span="3">
				<van-icon name='share'></van-icon>
			</van-col>
		</van-row>
		<!--海报图片-->
		<van-row class='pictrue'>
			<van-col span='24'>
				<div class="poster">
					<img id="imgrotate" class="auto-img" :src="currentSong.pic" />
				</div>
				<van-popup v-model="show">
					<div class="lyric">
						<img :src="currentSong.pic" alt="" /> {{lyric}}
					</div>
				</van-popup>
				<!--<scroll class="lyric-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
					<div>
						<div class="lyric">
							<p v-for="(line,index) in currentLyric.lines" ref="lyricLine" :class="{'current':currentLineNum===index}" class="text">{{line.txt}}</p>
						</div>
					</div>
				</scroll>-->

			</van-col>
		</van-row>
		<!--评论栏-->
		<van-row class="comment">
			<van-col span="6"><i ref="heart" id="heart" class="iconfont icon-aixin1" @click="add"></i></van-col>
			<van-col span="6"><i class="iconfont icon-buoumaotubiao48"></i></van-col>
			<van-col span="6"><i class="iconfont icon-woyaoxiexin" @click="getLyric"></i></van-col>
			<van-col span="6"><i class="iconfont icon-fenxiang1"></i></van-col>
		</van-row>
		<!--底部播放，切换音乐栏-->
		<van-row class='bottom'>
			<van-col span='3'><i class="iconfont icon-tubiaozhizuomoban p"></i></van-col>
			<van-col span='6'>
				<div><i class="iconfont icon-48shangyishou p" @click='Prevmusic'></i></div>
			</van-col>
			<van-col span='6'>
				<button class="play-pause" id="playPause" @click="playMusic">
            	<span id="icon-btn icon-play" ref="iconBtn"></span>
       			 </button>
			</van-col>
			<van-col span='6'>
				<div><i class="iconfont icon-49xiayishou p" @click="Nextmusic"></i></div>
			</van-col>
			<van-col span='3'>
				<div><i class="iconfont icon-list_icon p"></i></div>
			</van-col>

		</van-row>
		<!--音乐播放器-->
		<div class="audio-player">
			<van-row class='play-slider'>
				<!--音频-->

				<van-col span="3" class="start-time">{{currentTime}}</van-col>
				<van-col span="18">
					<van-slider v-model="value" class='slider' active-color="#e43c33" bar-height="3px" @change='changeValue(value)'>
						<div slot="button" class="custom-button"></div>
					</van-slider>
				</van-col>
				<van-col span="3" class="total-time">{{allTime}}</van-col>
			</van-row>
		</div>
		<audio ref="audio" id="ado" :src="currentSong.url" autoplay="autoplay"></audio>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar, Icon, Slider, Progress, Dialog, Toast } from 'vant';
	import bg2 from '../assets/logo.jpg'
	Vue.use(NavBar, Icon);
	import { Popup } from 'vant';
	Vue.use(Popup);
	import Scroll from 'better-scroll'
	import Lyric from 'lyric-parser'
	import { Base64 } from 'js-base64'
	let urlMap = {}

	export default {
		name: "Playmusic",

		data() {
			return {
				allSongItem: [],

				currentSong: [],

				singer: '',

				title: '',

				currentTime: '00:00',

				ifPlay: true,

				timer: null,

				value: 0,

				like: [],

				lyric: [],

				show: false,

				currentLyric: [],
				currentLineNum: []
			}
		},
		components: {
			[Progress.name]: Progress,
			[Dialog.name]: Dialog,
			[Slider.name]: Slider,
			[Toast.name]: Toast,
			Scroll
		},
		methods: {
			onClickLeft() {
				clearInterval(this.timer)
				this.$router.go(-2)
				//				this.$router.push({
				//					name: "Like"
				//				})
			},
			onClickRight() {
				Toast('按钮');
			},
			//加0操作
			addZero(value) {

				if(!value) {
					return '00';
				}
				return value > 9 ? value : '0' + value
			},
			//上一首
			Prevmusic() {
				for(var i = 0; i < this.allSongItem.length; i++) {

					if(this.currentSong.id == this.allSongItem[i].id) {
						var index = --i
						var lastIndex = parseInt(this.allSongItem.length - 1)
						if(index <= 0) {
							Toast('即将播放最后-首歌！')
							this.currentSong = this.allSongItem[lastIndex]
							this.title = this.allSongItem[lastIndex].name
							this.singer = this.allSongItem[lastIndex].singer

						} else {
							this.currentSong = this.allSongItem[index]
							this.title = this.allSongItem[i].name
							this.singer = this.allSongItem[i].singer
						}

					}

				}
			},
			//下一首
			Nextmusic() {
				for(var i = 0; i < this.allSongItem.length; i++) {

					if(this.currentSong.id == this.allSongItem[i].id) {
						var index = ++i
						var lastIndex = parseInt(this.allSongItem.length - 1)
						if(index >= lastIndex) {
							Toast('即将跳转到第一首歌！')
							this.currentSong = this.allSongItem[0]
							this.title = this.allSongItem[0].name
							this.singer = this.allSongItem[i].singer

						} else {
							this.currentSong = this.allSongItem[index]
							this.title = this.allSongItem[i].name
							this.singer = this.allSongItem[i].singer

						}

					}

				}
			},
			getTime() {
//				clearInterval(this.timer)

				//当前时间
				var time = this.$refs.audio.currentTime

				//总时间
				var totalTime = parseInt(this.currentSong.time)
				this.totalTime = totalTime
				this.value = parseFloat((time / totalTime) * 100)

				var mm = this.addZero(Math.floor(time / 60))
				var ss = this.addZero(parseInt(time % 60))

				this.currentTime = mm + ":" + ss

				if(this.value >= 100) {
					this.$refs.audio.pause
					this.isPlay = false
					playPause.style.background = "url(" + require("../assets/play.jpg") + ")"
					playPause.style.backgroundSize = "cover"
					imgrotate.style.animationPlayState = "paused"
				}
			},
			changeValue(value) {
				this.$refs.audio.currentTime = (value / 100) * this.totalTime
			},
			//播放或暂停
			playMusic() {
				if(this.isPlay) {
					clearInterval(this.timer)

					this.$refs.audio.pause()
					this.isPlay = false
					playPause.style.background = "url(" + require("../assets/play.jpg") + ")"
					playPause.style.backgroundSize = "cover"
					imgrotate.style.animationPlayState = "paused"

				} else {
					clearInterval(this.timer)
					this.timer = setInterval(this.getTime, 1000)
					this.$refs.audio.play()
					playPause.style.background = "url(" + require('../assets/purse.jpg') + ")"
					playPause.style.backgroundSize = "cover"
					imgrotate.style.animationPlayState = "running"
					this.isPlay = true

				}
			},
			add() {
				//				
				var bb = localStorage.getItem("likesong")
				this.like = bb == undefined ? {} : JSON.parse(bb)
				var heart = this.$refs.heart
				heart.style.color = "red"
				this.like.push(this.currentSong)
				var aa = localStorage.setItem("likesong", JSON.stringify(this.like))
			},
			getLyric() {       
				// 调用项目中获取歌词的api，获取到的是使用js-base64转了格式后的歌词（如图2）
				var i = this.currentSong.id  
				this.axios.post("https://api.itooi.cn/music/netease/lrc?id=" + i + "&key=579621905").then(lyric => {
					// 新建Lyric-parser歌词对象
					this.currentLyric = new Lyric(lyric, this.handleLyric)                 
					if(this.isPlay) {
						this.currentLyric.play()
					}

				})
			},
			handleLyric({
				lineNum,
				txt
			}) {
				this.currentLineNum = lineNum
				// 若当前行大于5,开始滚动,以保歌词显示于中间位置
				if(lineNum > 5) {
					let lineEl = this.$refs.lyricLine[lineNum - 5]        
					// 结合better-scroll，滚动歌词
					  this.$refs.lyricList.scrollToElement(lineEl, 1000)
				} else {
					this.$refs.lyricList.scrollToElement(0, 0, 1000)
				}

			},

		},
		created() {
			//当前歌单里面的所有歌
			clearInterval(this.timer)

			this.allSongItem = this.$route.params.item
			
			if(this.allSongItem != undefined) {
				localStorage.setItem("allSongItems", JSON.stringify(this.allSongItem))
			} else {
				this.allSongItem = JSON.parse(localStorage.getItem("allSongItems"))
			}
			
			for(var i = 0; i < this.allSongItem.length; i++) {
				if(this.$route.params.pid == this.allSongItem[i].id) {
					this.currentSong = this.allSongItem[i]
				}
			}

			this.title = this.currentSong.name
			this.singer = this.currentSong.singer
			var i = this.currentSong.id

		},
		mounted() {
			this.playMusic()

//			this.timer = setInterval(this.getTime, 1000)
		},
		computed: {
			allTime() {
				var mm = this.addZero(Math.floor(this.currentSong.time / 60))
				var ss = this.addZero(this.currentSong.time % 60)
				return mm + ":" + ss
			}
		},
		beforeDestroy() {
			clearInterval(this.timer)

		}
	}
</script>

<style lang="less" scoped>
	.playmusic {
		.bgimg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			filter: blur(50px);
		}
		.bgimg img {
			width: 100%;
			height: 100%;
		}
		.playtitle {
			width: 100%;
			height: 1.4rem;
			background: #40464D;
			text-align: center;
			line-height: 1.4rem;
			font-size: .6rem;
			color: #fff;
			.middle {
				font-size: .4rem;
			}
		}
		.pictrue {
			width: 100%;
			height: 19.5rem;
			background: rgba(255, 255, 255, .1);
			position: fixed;
			top: -1.4rem;
			z-index: -1;
			.poster {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;
				width: 6.5rem;
				height: 6.5rem;
				border-radius: 50%;
				background: linear-gradient(to right bottom, black, grey, black);
			}
			.auto-img {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 4.5rem;
				height: 4.5rem;
				border-radius: 50%;
				animation: play 10s infinite linear forwards paused;
			}
			@keyframes play {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			.lyric {
				width: 100%;
				img {
					position: absolute;
					z-index: -1;
					filter: blur(50px);
				}
				height: 10rem;
				color: white;
				font-size: 15px;
				text-shadow: 0 0 5px yellow;
				overflow-y: auto;
			}
		}
		.comment {
			width: 80%;
			height: .7rem;
			/*background: pink;*/
			position: absolute;
			bottom: 2.6rem;
			left: 1rem;
			text-align: center;
			.iconfont {
				font-size: .5rem;
				color: #F0F0F0;
			}
		}
		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, .2);
			height: 1.8rem;
			width: 100%;
			text-align: center;
			.p {
				line-height: 1.8rem;
				color: #fff;
				font-size: .7rem;
			}
			.icon-bofang {
				font-size: 1rem;
			}
			#icon-play {
				width: 40px;
				height: 40px;
				background: lightblue;
				display: block;
				color: #478f59;
			}
			#icon-pause {
				width: 40px;
				height: 40px;
				background: lightcoral;
				display: block;
				color: #478f59;
			}
			#playPause {
				margin: .3rem;
				width: 1.2rem;
				height: 1.2rem;
				border: none;
				background: url(../assets/purse.jpg) no-repeat;
				background-size: cover;
			}
		}
		.audio-player {
			.play-slider {
				width: 100%;
				height: .2rem;
				padding-top: .2rem;
				position: absolute;
				bottom: 1.9rem;
				text-align: center;
				/*background: pink;*/
				left: 0;
				color: #fff;
				text-shadow: 0 0 5px #D43C33;
				line-height: .1rem;
				.start-time {
					/*color: red;*/
					animation: light 2s linear 0s infinite alternate;
				}
				@keyframes light {
					from {
						text-shadow: 0 0 8px rgba(0, 255, 255, .8);
					}
					to {
						text-shadow: 0 0 4px rgba(255, 0, 255, .9);
					}
				}
				.slider {
					.custom-button {
						width: 5px;
						height: 5px;
						background: #D21418;
						border: 5px solid #fff;
						border-radius: 50%;
						margin-left: 15px;
					}
				}
			}
		}
	}
</style>