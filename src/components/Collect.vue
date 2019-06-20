<template>
	<div class="collect">
		<van-nav-bar class='top' title="我的收藏" right-text="" left-arrow @click-left="onClickLeft" />
		<van-tabs @click="onClick" class='nav'>
			<van-tab title="专辑">
				<form action="/">
					<van-search shape="round" placeholder="搜索专辑"  />
				</form>
				<van-row>
					<p class="coll">收藏的专辑({{liss.length}})</p>
					<li class="album" v-for="(item,index) in liss" :key="index" >
						<img  class="auto-img" :src="item[0].pic"/>
						<span class="desc">{{item[0].name}}</span> 
					</li>
				</van-row>
			</van-tab>
			<van-tab title="歌手">
				<van-search shape="round" placeholder="搜索歌手"  />
				<li class="list" v-for="(item,index) in list" :key="index">
					<img class="auto-img b" :src="item.pic"/>
					<span class="desc a">{{item.author}}</span>
				</li>
			</van-tab>
			<van-tab title="视频">
				<img class="bgimg" src="../assets/wu.jpg"/>
				<h1>收藏你喜欢的视频到这里</h1>
			</van-tab>
			<van-tab title="专栏">
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
				liss:[]
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
			console.log(get)
			this.list = get
			var liss  = JSON.parse(localStorage.getItem('colle'))
			this.liss = liss
			console.log(liss)
		}
	}
</script>

<style scoped>
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
		font-weight: normal;
		text-align: center;
		font-size: .2rem;
		color: gray;
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
	.a{
		
		font-family: "微软雅黑";
		font-size: .4rem;
	}
	.b{
		border-radius: 50%;
	}
	.desc {
		height: 2rem;
		line-height: 2rem;
		float: left;
	}
	.coll{
		padding-left: .2rem;
		background: #F0F0F0;
		padding: .1rem;
		color: rgba(0,0,0,.8);
	}
	.album{
		list-style: none;
		width: 100%;
		height: 2rem;
		background:#FFFDEF;
		border-bottom: 1px solid #F0F0F0;
	}
	.bgimg{
		padding-top: 1.4rem;
		width: 100%;
		height: 10rem;
	}
</style>