<template>
	<div class="message">
		<van-row class='imsg'>
			<van-col span='6'>
				<div @click="ImagePreview">
				<img  class="auto-img" src="http://127.0.0.1:8085/images/gedan-01.jpg" />
					
				</div>

			</van-col>
			<van-col span='10' class="id">范丞丞的女朋友</van-col>
			<van-col span='6' class='sign' @click='outlogin'><i class="iconfont icon-integral"> 签到</i></van-col>
		</van-row>
		<ul>

			<li>动态<br /> <b>100</b></li>
			<li>关注<br /> <b>4</b></li>
			<li>粉丝<br /> <b>1w</b></li>
			<li>我的资料<br /> <b>0</b></li>
		</ul>
		<van-row class='imsg3'>
			<van-col span='2'><i class="iconfont icon-xiaoxi"></i></van-col>
			<van-col span="18">我的消息</van-col>
			<van-col span="4">19></van-col>
		</van-row>
		<van-cell-group class='cont1'>
			</i>
			<van-cell class="cell" title="会员中心" value="1 >" />
			</i>
			<van-cell class="cell" title="商城" value="106 >" />
			</i>
			<van-cell class="cell" title="精品游戏推荐" value="缤纷圣诞焕彩上新 >" />
			<van-cell class="cell" title="在线听歌免流量" value="专辑/歌手/视频/专栏 >" />
		</van-cell-group>
		<van-cell-group class='cont2'>
			<van-cell class="cell" title="设置" value=" >" />
			<van-cell class="cell" title="扫一扫" value=" >" />
			<van-cell class="cell" title="个性换肤" value="官方红 >" />
			<van-cell class="cell" title="夜间模式" value="专辑/歌手/视频/专栏 >" />
			<van-cell class="cell" title="亲子频道" value="专辑/歌手/视频/专栏 >" />
			<van-cell class="cell" title="夜间模式" value="专辑/歌手/视频/专栏 >" />
			<van-cell class="cell" title="定时闹钟" value="专辑/歌手/视频/专栏 >" />

		</van-cell-group>
		<van-cell-group class='cont3'>
			<van-cell class="cell" title="加入网易云音乐人" value=" >" />
			<van-cell class="cell" title="分享网易云音乐" value=" >" />
			<van-cell class="cell" title="关于" value="官方红 >" />
		</van-cell-group>
		<van-button class="unlogin-btn" size="large" type="info" @click='outlogin'>退出登录</van-button>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { Button, Cell, CellGroup } from 'vant'
	Vue.use(Cell).use(CellGroup);
	import { ImagePreview } from 'vant';
	ImagePreview([
					'http://127.0.0.1:8085/images/gedan-01.jpg'
				]);
	export default {
		name: "Message",
		data() {
			return {
			
			}
		},
		methods: {
			outlogin() {
				this.$router.push({
					name: 'Login'
				})
			},
			ImagePreview() {
				this.$router.push({
					name: 'Login'
				})
			}

		},

		components: {
			[Button.name]: Button
			//		[ImagePreview.name]: ImagePreview
		}
	}
</script>

<style>
	.message {
		height: calc(100%-1.4rem);
		padding-top: 1.4rem;
		padding-bottom: 1.9rem;
		overflow-y: auto;
		background: #F0F0F0;
		position: relative;
		z-index: -1;
	}
	
	.imsg {
		height: 2.5rem;
		background: #FFFFFF;
		/*border-bottom: 1px solid #F0F0F0;*/
		line-height: 2.5rem;
	}
	
	.auto-img {
		padding: .4rem;
		border-radius: 50%;
		width: 70%;
		height: 70%;
	}
	
	.id {
		line-height: 2.5rem;
		color: rgba(0, 0, 0, .8);
	}
	
	.sign {
		width: 1.8rem;
		height: 1rem;
		border-radius: 20%;
		/*border: 1px solid #D43C33;*/
		margin-left: 1rem;
		line-height: 2.5rem;
	}
	
	.icon-integral {
		font-size: 15px;
		color: #D43C33;
		height: .7rem;
	}
	
	ul {
		width: 100%;
		height: 1.1rem;
		background: #fff;
		padding-top: .19rem;
		position: relative;
		top: 0rem;
		overflow: hidden;
		text-align: center;
		color: rgba(0, 0, 0, .8);
	}
	
	li {
		display: inline-block;
		width: 25%;
		position: relative;
		top: 0;
		left: 0;
		box-sizing: border-box;
		padding-top: .1rem;
		border-right: 1px solid #f0f0f0;
	}
	
	.imsg3 {
		background: #FFF;
		margin-top: .2rem;
		margin-bottom: .2rem;
		height: .9rem;
		line-height: .9rem;
		color: rgba(0, 0, 0, .8);
	}
	
	.icon-xiaoxi {
		color: #CCCCCC;
		font-size: .5rem;
		padding-left: 0.1rem;
	}
	
	.van-button--info {
		margin-top: .3rem;
		background: #FFFFFF;
		color: #D43C33;
		border: none;
	}
	
	.cont2 {
		margin-top: .3rem;
	}
	
	.cont3 {
		margin-top: .5rem;
	}
</style>