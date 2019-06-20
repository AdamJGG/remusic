<template>
	<div class="frist">
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<div>
			<van-swipe :autoplay="3000" indicator-color="white" class='swipe'>
				<van-swipe-item>
					<img class="swipe1" src="../assets/wyy-01.jpg" />

				</van-swipe-item>
				<van-swipe-item>
					<img class="swipe1" src="../assets/wyy-02.jpg" />

				</van-swipe-item>
				<van-swipe-item>
					<img class="swipe1" src="../assets/wyy-03.jpg" />

				</van-swipe-item>
				<van-swipe-item>
					<img class="swipe1" src="../assets/wyy-04.jpg" />
				</van-swipe-item>
				<van-swipe-item>
					<img class="swipe1" src="../assets/wyy-05.jpg" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<van-row class="jiesao">
			<van-col span="6">
				<i class="iconfont icon-xianxing_diantai f"></i>
				<p>私人发现</p>
			</van-col>
			<van-col span="6">
				<i class="iconfont icon-rili f"></i>
				<p>每日推荐</p>
			</van-col>
			<van-col span="6">
				<i class="iconfont icon-jiarugedan f"></i>
				<p>歌单</p>
			</van-col>
			<van-col span="6">
				<i class="iconfont icon-paihangbang-- f"></i>
				<p>排行榜</p>
			</van-col>
		</van-row>
		<ul>
			<div class="nav">
				<h5>搜索歌单 ></h5>
				<van-row class="gedan">
					<van-col span="8" v-for="(item,index) in list" :key="index">
						<img class="l" v-lazy="item.coverImgUrl" @click="goState({name:'Play',params:{pid:item.id}})" />
						<p>{{item.title}}</p>
					</van-col>

				</van-row>

			</div>
		</ul>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { Swipe, SwipeItem } from 'vant';

	Vue.use(Swipe).use(SwipeItem);
	import { NavBar } from 'vant';

	Vue.use(NavBar);
	export default {
		name: 'Frist',
		data() {
			return {
				list: [],
				isLoading: true
			}
		},
		methods: {
			onClickLeft() {
				Toast('返回');
			},
			onClickRight() {
				Toast('按钮');
			},
			goState(path) {
				this.$router.push(path)
			}

		},
		created() {
			this.axios.post("https://api.itooi.cn/music/netease/highQualitySongList?key=579621905").then(re => {
				var re = localStorage.setItem('re', JSON.stringify(re))

				var res = JSON.parse(localStorage.getItem("re")).data.data.playlists.splice(10, 20)
				this.list = res
				this.isLoading = false

			})

		}

	}
</script>

<style lang="less">
	.frist {
		background: #D43C33;
		width: 100%;
		height: 700px;
		overflow-y: auto;
		position: absolute;
		top: 1.1rem;
		left: 0;
	}
	
	.van-tabs {
		position: relative;
		top: 1.6rem;
	}
	
	.swipe {
		width: 96%;
		height: 5rem;
		position: relative;
		border-radius: 5px;
		left: 0;
		right: 0;
		top: .1rem;
		margin: auto;
		background-size: cover;
		background-repeat: no-repeat;
		overflow: hidden;
		z-index: 2;
		border-bottom: 1px solid #FFFFFF;
	}
	
	.swipe1 {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-repeat: no-repeat;
	}
	
	.jiesao {
		position: relative;
		top: -1.28rem;
		height: 1.8rem;
		background: #FFFFFF;
		width: 100%;
		border-bottom: 1px solid #CCCCCC;
		padding: 2rem 0rem 0.2rem 0rem;
		z-index: 0;
	}
	
	p {
		font-size: 11px;
		color: rgba(0, 0, 0, .8);
	}
	
	.f {
		padding: .28rem;
		font-size: .5rem;
		background: #D43C33;
		border-radius: 50%;
		color: white;
		position: relative;
		top: 0;
		left: 0;
	}
	
	ul .nav {
		position: relative;
		top: -1.59rem;
		left: 0;
		width: 100%;
		/*height: 1.5rem;*/
		background: #FFFFFF;
		overflow: hidden;
		border: 0.015rem solid #F0F0F0;
		padding-bottom: 4rem;
	}
	
	h5 {
		position: relative;
		top: 0;
		left: 0;
		/*padding: .5rem;*/
		/*float: left;*/
		color: rgba(0, 0, 0, .8);
	}
	
	.gedan {
		position: relative;
		top: 0rem;
		height: 700px;
		left: 0;
		p {
			font-size: 11px;
			color: rgba(0, 0, 0, .8);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100px;
		}
	}
	
	.l {
		width: 100%;
		height: 100%;
		/*padding: .2rem;*/
		border-radius: 5%;
	}
	
	.van-col--8 {
		padding: .044rem;
		border: 1px solid #fff;
	}
	
	.van-tabs__nav {
		background-color: #D43C33;
	}
	
	.van-tab {
		color: #fff;
	}
	
	.van-tab--active {
		font-weight: 700;
		color: white;
	}
</style>