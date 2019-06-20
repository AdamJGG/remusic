<template>
	<div class="mine">
		<van-row class="my">
			<van-col span="3">
				<i class="iconfont icon-yun"></i>
			</van-col>
			<van-col span="18"><b>我的音乐</b></van-col>
			<van-col span="3">
				<i class="iconfont icon-yinliang"></i>
			</van-col>
		</van-row>
		<van-row class='cont'>
			<van-col span="3"><i class="iconfont icon-yinyue r"></i></van-col>
			<van-col span="21"><van-cell class="cell" title="本地音乐" value=" >"  @click='goState({name:"Local"})'/></van-col>
		</van-row>
		<van-row class='cont'>
			<van-col span="3"><i class="iconfont icon-zuijinbofang r"></i></van-col>
			<van-col span="21"><van-cell class="cell" title="最近播放" value=" >"  @click='goState({name:"Recent"})'/></van-col>
		</van-row>
		<van-row class='cont'>
			<van-col span="3"><i class="iconfont icon-diantaizhibo r"></i></van-col>
			<van-col span="21"><van-cell class="cell" title="我的电台" value=" >"  @click='goState({name:"Local"})'/></van-col>
		</van-row>
		<van-row class='cont'>
			<van-col span="3"><i class="iconfont icon-wodeshoucang r"></i></van-col>
			<van-col span="21"><van-cell class="cell" title="我的收藏" value="专辑/歌手/视频/专栏 >"  @click='goState({name:"Collect"})'/></van-col>
		</van-row>
		<van-row class='cont'>
			<van-col span="3"><i class="iconfont icon-night r"></i></van-col>
			<van-col span="21"><van-cell class="cell" title="Sati空间" value="特别的聆听模式 >"  @click='goState({name:"Local"})'/></van-col>
		</van-row>
		<van-row class='cn'>
			<van-col span='22'>
				<p class="p">∨ 我创建的歌单(2)</p>
			</van-col>
			<van-col span='2' class="piont">• • •</van-col>
		</van-row>
		<van-cell-group class='cont'>
			<!--<van-cell  title="☆本地音乐" value="115" @click="goState({name:'Like'})"/>-->
			<van-cell  title="☆我喜欢的音乐" :value="currentsongscount" @click="goState({name:'Second'})" />
		</van-cell-group>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { Cell, CellGroup } from 'vant';

	Vue.use(Cell).use(CellGroup);
	export default {
		name: 'Mine',
		data(){
			return{
				currentsongscount:0
			}
		},
		methods:{
			getMusic(){
			this.$router.push({name:'Like'})
				
			},
		goState(path){
			this.$router.push(path)
		}
		
		},
		created(){
			var mattedArray = JSON.parse(localStorage.getItem("likesong"))
			this.list = mattedArray
			this.currentsongscount = mattedArray.length
		}
	}
</script>

<style scoped>
	.my {
		width: 100%;
		text-align: center;
		height: 1.4rem;
		background: #D43C33;
	}
	
	.iconfont {
		
		font-weight: normal;
		color: white;
		font-size: 1rem;
		text-align: center;
		line-height: 1.4rem;
		float: left;
	}
	.cont{
		width: 100%;
		height: 1.4rem;
		
	}
	.cell {
		width: 100%;
		height: 1.4rem;
		float: right;
		line-height: .87333rem;
		border-bottom: 1px solid #F0F0F0;
	}
	.cell:nth-last-of-type{
		border-bottom: none;
	}
	.r {
		width: 100%;
		height: 100%;
		color: #D43C33;
		font-size: .7rem;
	}
	
	.icon-zuijinbofang {
		font-weight: 1000;
	}
	.icon-z {
		font-weight: 1000;
		font-size: .8rem;
	}
	
	.icon-wodeshoucang {
		font-size: .9rem;
	}
	.icon-night{
		font-size: .9rem;
	}
	.icon-yun{
		padding-left: .25rem;
	}
	/*.icon-yinliang{
		padding-left:.25rem ;
	}*/
	b {
		font-weight: normal;
		color: white;
		font-size: 18px;
		line-height: 1.4rem;
	}
	.piont{
		line-height: 1rem;
		color: rgba(0,0,0,.8);

	}
	.cn {
		width: 100%;
		height: 1rem;
		background: #F0F0F0;
		overflow: hidden;
		font-size: 12px;
		line-height: .4rem;
	}
	.p{
		padding-left: .1rem;
	}
</style>