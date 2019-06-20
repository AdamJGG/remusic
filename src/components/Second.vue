<template>
	<div class="second">
		<div class="se">

			<van-search placeholder="搜索歌单内歌曲" background='rgba(0,0,0,.8)' shape="round"/>

		</div>
		<van-row class='like1'>
			<van-col span='11' class='bg'><img src="../assets/gedan-01.jpg" /></van-col>
		</van-row>
		<div class="m">
			<i class="iconfont icon-aixin"></i>
			<p>我喜欢的音乐 {{currentsongscount}} 首</p>

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
				<van-col span='22'>播放全部（共{{currentsongscount}}首）</van-col>
			</van-row>
			<li v-for="(item,index) in list" :key='index'@click="goState({name:'Playmusic',params:{pid:item.id,item:list}})" ><b>{{index+1}}</b>
				{{item.name}}{{item.title}}

			</li>
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
		name: 'Second',
		data() {
			return {
				list: [],
//				songs:{},
				loading: false,
				finished: false,
				currentsongscount:0
			};
		},

		mounted(){
			window.onscroll = function(){
				console.log("aaaa")
			}
		},
		methods: {
			goState(path){
				this.$router.push(path);
			}
		},
		created() {
			var mattedArray = JSON.parse(localStorage.getItem("likesong"))
			this.list = mattedArray
			console.log(this.list)
			this.currentsongscount = mattedArray.length
			
		}
	}
</script>

<style scoped>
	.like {
		width: 100%;
		height: 700px;
		overflow-y: auto;
	}
	
	.like1 {
		width: 100%;
		height: 3.33rem;
	}
	
	.bg {
		line-height: 3.3rem;
	}
	
	img {
		padding: .2rem;
		border-radius: 15px;
		filter: blur(1px);
	}
	.m {
		display: block;
		width: 100%;
		height: 5.8rem;
		position: relative;
		top: -3.8rem;
		left: 0;
		background: rgba(2,0,5,.5);
	}
	
	.m p {
		font-size: 18px;
		color: rgba(0,0,0,.8);
		line-height: 3.33rem;
	}
	
	.van-field__control {
		text-align: center;
	}
	.van-search__content{
		background: rgba(255,255,255,.7);
	}
	.m i {
		position: absolute;
		left: 0;
	}
	
	.in {
		position: relative;
		top: -5.5rem;
		left: 0;
		width: 100%;
		height: 1.3rem;
		background:rgba(2,0,5,.5);
		text-align: center;
		color: #fff;
		padding-top: .33rem;
	}
	
	.in li {
		display: inline-block;
		width: 2rem;
		height: 100%;
		background: pink;
		border: 1px solid red;
	}
	
	.in li i {
		color: #fff;
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
	}
	
	.chart .play {
		padding-bottom: .3rem;
		border-bottom: 1px solid #F0F0F0;
		margin-left: .3rem;
	}
	
	.chart li {
		width: 98%;
		height: 1rem;
		font-size: 14px;
		color: #000000;
		list-style: none;
		line-height: 1rem;
		border-bottom: 1px solid #F0F0F0;
		margin-left: .3rem;
		overflow: hidden;
	}
	
	.chart li b {
		display: inline-block;
		width: .5rem;
		text-align: center;
		padding-right: .3rem;
		color: rgba(0, 0, 0, .5);
		/*background: red;*/
	}
</style>