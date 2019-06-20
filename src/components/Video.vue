<template>
	<div class="video">
		<div class="spirnner" v-show="isLoading">
			<van-loading type="spinner" color="red" class="loading" size='45px' />
		</div>
		<van-row class='title'>
			<van-col span="4" class='icon1'>
				<i class="iconfont icon-maikefeng"></i>
			</van-col>
			<van-col span="16">
				<van-search placeholder="大家都在搜 防弹少年" @focus="goState({name:'Local'})" />
			</van-col>
			<van-col span="4" class='icon2'>
				<i class="iconfont icon-yinliang"></i>

			</van-col>

	
			<van-tabs v-model="active" class='content'>
				<van-tab title="推荐">
					<li class="liss" v-for="(item,index) in list" :key="index">
							<img class="auto-img img" v-lazy="item.coverImgUrl" 
								@click="goState({name:'Play',params:{pid:item.id}})"/>
							<p>{{item.title}}</p>
						</li>
				</van-tab>
				<van-tab title="听歌轨迹">
					<li class="liss" v-for="(item,index) in lis" :key="index">
							<img class="auto-img img" v-lazy="item.coverImgUrl" 
								@click="goState({name:'Play',params:{pid:item.id}})"/>
							<p>{{item.title}}</p>
						</li>
				</van-tab>
				<van-tab title="翻唱">
					<li class="liss" v-for="(item,index) in liss" :key="index">
							<img class="auto-img img" v-lazy="item.coverImgUrl" 
								@click="goState({name:'Play',params:{pid:item.id}})"/>
							<p>{{item.title}}</p>
						</li>
				</van-tab>
				<van-tab title="演奏">
					<li class="liss" v-for="(item,index) in litt" :key="index">
							<img class="auto-img img" v-lazy="item.coverImgUrl" 
								@click="goState({name:'Play',params:{pid:item.id}})"/>
							<p>{{item.title}}</p>
						</li>
				</van-tab>
			</van-tabs>

		</van-row>

	</div>

</template>

<script>
	import qs from 'qs'
	
	import Vue from 'vue'
	import { Tab, Tabs } from 'vant';

	Vue.use(Tab).use(Tabs);
	export default {
		name: 'Video',
		data() {
			return {
				active: 0,
				list: [],
				lis:[],
				liss:[],
				litt:[],
				isLoading: true,
				
			}
		},
		methods: {
			musics() {
				var musics = JSON.parse(localStorage.getItem("result")).data.Body

				console.log("list==>", this.list)
				console.log("arr==>", arr)
			},
			goState(path) {
				this.$router.push(path)
			}
		},
		created() {

			var params = {

				"TransCode": "020112",
				"OpenId": "123456789",
				"Body": {
					"SongListId": "141998290"
				}

			};
			var paramsStr = qs.stringify(params);
			this.$http({
				method: 'POST',
				url: 'https://api.hibai.cn/api/index/index',
				data: paramsStr
			}).then(result => {

				//看不到的
				var re = localStorage.setItem('result', JSON.stringify(result))
				this.axios.post("https://api.itooi.cn/music/netease/highQualitySongList?key=579621905").then(re => {
					var re = localStorage.setItem('re', JSON.stringify(re))
					var res = JSON.parse(localStorage.getItem("re")).data.data.playlists.splice(20, 39)

					this.list = res
					var ress = JSON.parse(localStorage.getItem("re")).data.data.playlists.splice(40, 21)
					this.lis = ress
					var reli = JSON.parse(localStorage.getItem("re")).data.data.playlists.splice(50, 39)
					this.liss = reli
					var relit = JSON.parse(localStorage.getItem("re")).data.data.playlists.splice(70, 21)
					this.litt = relit
					this.isLoading = false
					
				})

			})

		}
	}
</script>

<style lang="less" >
	.video{
		.title {
		height: 1.6rem;
		font-size: 16px;
		width: 100%;
		text-align: center;
		padding-top: .1rem;
		background: #D43C33;
		overflow: hidden;
		.van-search {
		line-height: 1.6rem;
		margin-top: .25rem;
		height: 1rem;
		border-radius: 30px;
	}
	
	.auto-img {
		width: 1rem;
		height: 1rem;
		/*padding-left: .28rem;*/
	}
	
	.van-search__content {
		background: transparent;
	}
	
	.content {
		position: absolute;
		top: 1.6rem;
		width: 100%;
		z-index: -1;
		overflow-y: auto;
	}
	
	.iconfont {
		font-size: 1rem;
		color: white;
		line-height: 1.6rem;
	}
	
	.van-tabs__nav--line {
		background: #D43C33;
	}
	
	.van-tab {
		color: whitesmoke;
	}
	
	.titlep {
		font-size: .51rem;
		color: #FFF;
		text-shadow: 1PX 1PX 5PX red;
		height: 1.4rem;
		background: url(../assets/bg-02.jpg);
		margin: 0;
		padding: 0;
		line-height: 1.4rem;
	}
	
	.van-tab--active {
		font-weight: 700;
		color: white;
	}
	
	.constant {
		width: 100%;
		height: 26.6rem;
		position: relative;
		top: 0rem;
		overflow-y: auto;
		background: url(../assets/bg-02.jpg) 0PX -52PX;
	}
	
	.liss {
		display: inline-block;
		list-style: none;
		width: 32%;
		float: left;
		background: none;
		margin-left: .1rem;
		p{
			color: rgba(0,0,0,.6);
			max-width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 12px;
		}
		.img {
		border-radius:5px ;
		width: 100%;
		height: 3rem;
	}
		
	}	
	}
	
	}
	
	
	
</style>