<template>
	<div class="find">
		<van-row class='title'>
			<van-col span="4" class='icon1' >
				<div @click="goState({name:'Like'})">
					<i class="iconfont icon-maikefeng"></i>
				</div>
				
					
			</van-col>
			<van-col span="16">
				<van-search placeholder="请输入搜索关键词" @focus="goState({name:'Local'})"/>
			</van-col>
			<van-col span="4" class='icon2'>
				<i class="iconfont icon-yinliang"></i>

			</van-col>
			<van-tabs v-model="active" class='content'>
				<van-tab title="个性推荐" color="#fff">
					<div>
						<router-view></router-view>
					</div>

				</van-tab>
				<van-tab title="主播电台">
					<div class="conten">
						<van-swipe :autoplay="3000" indicator-color="white" class='swipe'>
						<van-swipe-item>
							<img class="swipe1" src="../assets/wyy-07.jpg" />

						</van-swipe-item>
						<van-swipe-item>
							<img class="swipe1" src="../assets/wyy-08.jpg" />

						</van-swipe-item>
						<van-swipe-item>
							<img class="swipe1" src="../assets/wyy-09.jpg" />

						</van-swipe-item>
						<van-swipe-item>
							<img class="swipe1" src="../assets/wyy-10.jpg" />
						</van-swipe-item>
						<van-swipe-item>
							<img class="swipe1" src="../assets/wyy-11.jpg" />
						</van-swipe-item>
					</van-swipe>
					<van-row class="classifys">
						<van-col span="6" class="classify">
							<i class="iconfont icon-fenlei f"></i>
							<p>电台分类</p>
						</van-col>
						<van-col span="6" class="classify">
							<i class="iconfont icon-xianxing_diantai f"></i>
							<p>电台排行</p>
						</van-col>
						<van-col span="6" class="classify">
							<i class="iconfont icon-56 f"></i>
							<p>付费精品</p>
						</van-col>
						<van-col span="6" class="classify">
							<i class="iconfont icon-erji f"></i>
							<p>音乐课堂</p>
						</van-col>
					</van-row>
					<van-row class="youxuan">
						<!--<li class="titleshow">
							<van-col span="0" class='today'>今日优选</van-col>
						<van-col span="4">换一换</van-col>
						</li>-->
							
						
						<van-row class="show" v-for="(item,index) in lists" :key="index">
							<van-col span="6" class="imgbox">
								<div>
									<img class="auto-img" v-lazy="item.pic"/>
								</div>
							</van-col>
							<van-col span="16" class="show-info">
								<div class="show-info">
									<p>{{item.author}}电台</p>
									<p>节目：{{index}}</p>
									<p>用我的声音温暖你</p>
								</div>
							</van-col>
						</van-row>
					
					</van-row>
					
					</div>
					
				</van-tab>

			</van-tabs>
		</van-row>

	</div>

</template>

<script>
	import Vue from 'vue'
	
	export default {
		name: 'Find',
		data() {
			return {
				active: 0,
				lists:[],
				isNone: false,
			}
		},
		methods: {
			goState(path) {
				this.$router.push(path)
			}
		},
		mounted(){
			window.onscroll = function(){
				console.log("aaaa")
			}

		},
		created(){
			
			var lazy = JSON.parse(localStorage.getItem('saves')).slice(20,80)
//			console.log("songs==>",lazy)
			this.lists = lazy

		}
	}
</script>

<style lang="less" scoped>
	.title {
		height: 1.6rem;
		text-align: center;
		padding-top: .1rem;
		background: #D43C33;
	}
	.van-search {
		line-height: 1.4rem;
		margin-top: .25rem;
		height: 1rem;
		border-radius: 30px;
	}
	
	.van-search__content {
		background: transparent;
	}
	
	.auto-img {
		width: 1rem;
		height: 1rem;
		padding-left: .28rem;
	}
	
	.content {
		position: fixed;
		top: 1.6rem;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		z-index: -1;
		color: #fff;
	}
	
	.iconfont {
		font-size: 1rem;
		color: white;
		line-height: 1.6rem;
	}
	
	.swipe {
		width: 96%;
		height: 5rem;
		position: relative;
		border-radius: 5px;
		left: 0;
		right: 0;
		top: .02rem;
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
	.classifys{
		width: 100%;
		height: 2.4rem;
		padding-top:1.5rem ;
		background: #fff;
		position: relative;
		top: -1.4rem;
		.classify{
			height: 2rem;
			position: relative;

			p{
				position: relative;
				top: -.45rem;
				left: 0;
			}
		}
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
		p {
		font-size: 11px;
		color: rgba(0, 0, 0, .8);
	}
	.conten{
		width: 100%;
		height: 700px;
		overflow-y:auto ;
		background:#D43C33;
		position: absolute;
		top: 1.18rem;
		left: 0;
		right: 0;
		bottom: 0;
	}

	
	.youxuan{
		
		position: relative;
		top: -1.5rem;
		left: 0;
		background: #fff;
		color: rgba(0,0,0,.8);
		border-top: 0.015rem solid #f0f0f0;
		padding-top: .4rem;
		.titleshow{
			display: block;
			background: #A71D5D;
			list-style:none
			.today{
			text-align: left;
			padding-left: .4rem;
			font-size: .4rem;
			font-weight: 1000;
			
			}
		}
			.show{
			width: 100%;
			height: 3rem;
			background: #fff;
			border-top:0.015rem solid #F0F0F0;
			
		}
		.show .imgbox{
			width: 3rem;
				height: 3rem;
				border: none;
				float: left;
			}
		.show .imgbox div img{
				width: 100%;
				height: 100%;
				border: none;
				/*float: left;
				display: block;*/
				position: relative;
				left: 0;
				top: 0;
				}
		.show-info{
			padding-right: 1rem;
			position: relative;
			float: right;

		}	
			
		.show .imgbox p:nth-of-type(1){
				font-weight: 1000;
				font-size: .4rem;
			}

	}
		
</style>