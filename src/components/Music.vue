<template>
	<div class="music">
		<van-nav-bar title="歌单" right-text="•••" left-arrow @click-left="onClickLeft" @click-right="onClickRight" :active="$route.query.active || -1"/>
		
			<router-view></router-view>
	
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar } from 'vant';

	Vue.use(NavBar);
	export default {
		name: 'Music',
		methods: {
			onClickLeft() {
				this.$router.go(-1)
//				this.$router.push({name:'Mine'})
			},
			onClickRight() {
				Toast('按钮');
			}
		}
	}
</script>

<style scoped>
	.music {
		width: 100%;
		height:100%;
		position: absolute;
		top: 0;
		left: 0;
		overflow-y: auto;

	}
	
	.van-nav-bar {
		background: rgba(0,0,0,.8);
	}
	
	.van-nav-bar__title {
		color: #FFF
	}
	
	.van-nav-bar__text {
		color: #fff;
	}
	
	.van-nav-bar .van-icon {
		color: #FFFFFF;
	}
</style>