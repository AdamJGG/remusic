<template>
	<div class="like">
		<!--<div class="se">

			<van-search placeholder="搜索歌单内歌曲" shape="round" />

		</div>-->
		<van-row class='like1'>
			<van-col span='11' class='bg'><img src="../assets/wyy-01.jpg" /></van-col>
		</van-row>
		<div class="m">
			<i class="iconfont icon-aixin"></i>
			<p>本地音乐,更贴近心灵的声音，我更懂你</p>

		</div>
		<van-row class="in">
			<van-col span='6'>
				<i class="iconfont icon-jiarugedan"></i><br/>评论</van-col>
			<van-col span='6'>
				<i class="iconfont icon-jiarugedan"></i><br/>分享</van-col>
			<van-col span='6'>
				<i class="iconfont icon-56"></i><br/>下载</van-col>
			<van-col span='6'>
				<i class="iconfont icon-huiyuandengji"></i><br/>多选</van-col>

		</van-row>
		<ul class="chart">
			<van-row class='play'>
				<van-col span='2'><i class="iconfont icon-yinyue"></i></van-col>
				<van-col span='22'>播放全部（共{{likesongslist.length}}首）</van-col>
			</van-row>
			<van-row class="song" v-for="(item,index) in likesongslist" :key="index">
				<van-col span="20" offset="1">
					<b>{{index+1}}</b>{{item.name}}
				</van-col>
				<van-col span="2" offset="1"><i class="iconfont icon-bofang" @click="goState({name:'Playmusic',params:{pid:item.id,item:songslist}})"> </i></van-col>

			</van-row>
		</ul>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { Search, List } from 'vant';
	Vue.use(Search, List);
	import qs from 'qs'
	import songs from '../data/data.js'
	console.log(songs)
	export default {
		name: 'Songlist',
		data() {
			return {
				currentGedan: null,
				likesongslist: []
			}
		},
		created() {
		
			this.axios.post("https://api.itooi.cn/music/netease/songList?key=579621905&id=988690134").then(gedanid => {
				localStorage.setItem("gedanid", JSON.stringify(gedanid))

				var likesongslist = JSON.parse(localStorage.getItem("gedanid")).data.data.songs
				
									console.log("songslist==>",likesongslist)
				this.likesongslist = likesongslist
			})
			
		},
		methods: {
			goState(path) {
				this.$router.push(path)
			}
		}
	}
</script>

<style lang="less" scoped>
	.like {
		width: 100%;
		height: 700px;
		overflow-y: auto;
	}
	
	.like1 {
		width: 100%;
		height: 3.33rem;
		.bg {
			line-height: 3.3rem;
			filter: blur(5px);
			img {
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			}
		}
	}
	
	.m {
		display: block;
		width: 100%;
		height: 6.8rem;
		position: relative;
		top: -4rem;
		left: 0;
		background: rgba(0, 0, 0, .2);
		p {
			font-size: 0.32rem;
			color: #FFFFFF;
			/* background: pink; */
			width: 5.33333rem;
			height: 3rem;
			overflow-y: auto;
			float: right;
			padding: 0.5rem;
			position: absolute;
			top: 1.6rem;
			right: 0rem;
		}
		i {
			    position: absolute;
    left: 0;
    top: 1.0rem;
		}
		.imgb {
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			border: 0.05333rem solid wheat;
			float: left;
			position: absolute;
			top: 1.3rem;
			left: 0.5rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.in {
		position: relative;
		top: -5.5rem;
		left: 0;
		width: 100%;
		height: 1.3rem;
		background: rgba(0, 0, 0, .5);
		text-align: center;
		color: #fff;
		padding-top: .33rem;
		li {
			display: inline-block;
			width: 2rem;
			height: 100%;
			background: pink;
			border: 1px solid red;
			i {
				color: #fff;
			}
		}
	}
	
	.icon-aixin {
		font-size: 3.3rem;
		color: white;
		padding-left: .2rem;
	}
	
	.b {
		width: 25%;
		font-size: .8rem;
		color: #fff;
		position: relative;
	}
	
	.icon-fenxiang {
		width: 25%;
		float: left;
	}
	
	.chart {
		width: 100%;
		border-top-left-radius: .2rem;
		border-top-right-radius: .2rem;
		background: #FFF;
		padding-top: .4rem;
		position: relative;
		top: -5.6rem;
		left: 0;
		/*padding-left: .3rem;*/
		.play {
			padding-bottom: .3rem;
			border-bottom: 1px solid #F0F0F0;
			margin-left: .3rem;
		}
		.song {
			width: 98%;
			height: 1rem;
			font-size: 14px;
			color: #000000;
			list-style: none;
			line-height: 1rem;
			border-bottom: 1px solid #F0F0F0;
			margin-left: .3rem;
			overflow: hidden;
			b {
				display: inline-block;
				width: .5rem;
				text-align: center;
				padding-right: .3rem;
				color: rgba(0, 0, 0, .5);
				/*background: red;*/
			}
		}
	}
</style>