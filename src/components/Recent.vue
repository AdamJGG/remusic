<template>
	<div class="recent">
		<van-nav-bar class='top' title="最近播放" right-text="" left-arrow @click-left="onClickLeft" />
		<van-tabs @click="onClick" class='nav'>
			<van-tab title="歌曲">
				<form action="/">
					<van-search shape="round" placeholder="请输入搜索本地歌曲"  />
				</form>
				<!--<li class="recent-play" v-for="(item,index) in recentMusics" :key="index">
					{{item}}
				</li>-->
				
				<van-row class="recent-play" v-for="(item,index) in recentMusics" :key="index">
					<van-col span="20" offset="1"><li>{{item.title}}{{item.name}}</li></van-col>
					<van-col span="2" offset="1"><i class="iconfont icon-bofang"></i></van-col>
				</van-row>
			</van-tab>
			<van-tab title="视频">
				<h1>最近未有播放视频哟~</h1>
			</van-tab>
			<van-tab title="其他">
				<li class="list" v-for="(item,index) in list" :key="index">
					<img class="auto-img" :src="item.pic" alt="" />
					<span class="desc">{{item.title}}</span>
				</li>
				<!--<li v-for="(item,index) in list" :key="index"></li>-->
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default {
		name: 'Local',
		data() {
			return {
				list: [],
				
				recentMusics:[],
				
				
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push({
					name: 'Mine'
				})
			},
			onClick(index, title) {

			}
		},
		created() {

			var get = JSON.parse(localStorage.getItem("gedanid")).songs
			var searchMusics = JSON.parse(localStorage.getItem("searchMusics"))
			console.log("seatch==>",searchMusics)
			var likesongs = JSON.parse(localStorage.getItem('likesongs'))
			this.list = get
			this.recentMusics = likesongs
		}
	}
</script>

<style lang="less" scoped>
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
	.recent-play{
		border-top:0.015rem solid #F0F0F0 ;
		list-style: none;
		width: 100%;
		height: 1rem;
		/*padding-left: .4rem;*/
		background: #fff;
		font-size: .2rem;
		line-height: 1rem;

		li{
		/*border-bottom: 0.015rem solid #D43C33;*/
			
		}
	}
</style>