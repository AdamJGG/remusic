<template>
	<div class="songlist">
		<van-row class="title-top">
		<van-col span="24">
			<img class="auto-img" :src="currentGedan.coverImgUrl" alt="" />
		</van-col>
		</van-row>
		<van-row class="text">
			<van-col span="24">
				<span>{{currentGedan.description}}</span>
			</van-col>
		</van-row>
		<van-row class="song" v-for="(item,index) in songslist" :key="index">
			<van-col span="20"offset="1">
				{{item.name}}
			</van-col>
			<van-col span="2" offset="1"><i class="iconfont icon-bofang" @click="goState({name:'Playmusic',params:{pid:item.id,item:songslist}})"> </i></van-col>
		</van-row>
	</div>
</template>

<script>
	export default{
		name:'Songlist',
		data(){
			return{
				currentGedan:null,
				songslist:[]
			}
		},
		created(){
				var gedan = JSON.parse(localStorage.getItem("re"))
				var res = JSON.parse(localStorage.getItem("re")).data.data.playlists.splice(10, 20)
			for(var j = 0; j < res.length; j++) {
				if(this.$route.params.pid == res[j].id) {
					this.currentGedan = res[j]
					break
				}
			}
			var i = this.currentGedan.id
			
			this.axios.post("https://api.itooi.cn/music/netease/songList?key=579621905&id="+i).then(gedanid => {
					localStorage.setItem("gedanid",JSON.stringify(gedanid))
					
					var songslist = JSON.parse(localStorage.getItem("gedanid")).data.data.songs
//					console.log("songslist==>",songslist)
					this.songslist = songslist
				})
//			var songslist = JSON.parse(localStorage.getItem("gedanid")).data.data.songs
////					console.log("songslist==>",songslist)
//					this.songslist = songslist
		},
		methods:{
			goState(path){
				this.$router.push(path)
			}
		}
	}
</script>

<style lang="less" scoped>
  .songlist{
  	position: absolute;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	background:#FFFFFF;
  	/*padding-top: 1.2rem;*/
  	overflow-y: auto;
  	.title-top{
  		width: 100%;
  		height: 6rem;
  		font-size: 12;
  		color: #fff;
  		background: rgba(0,0,0,.5);
  		text-align:center;
  		position: relative;
  		overflow: hidden;
  		 .auto-img{
  			width: 100%;
  			height: 100%;
  			position: absolute;
  			top: 0;
  		}
  	}
  	.text{
  		max-width: 100%;
  		max-height: 4rem;
  		background: #F0F0F0;
  		overflow-y: auto;
  		span{
  			margin-left:.2rem ;
  		}
  	}
  	.song{
  		font-size: 14px;
  		height: 1rem;
  		line-height: 1rem;
  		border-bottom: 0.015rem dotted gray;
  		position: relative;
  		.icon-bofang{
  			position: absolute;
  			right: .2rem;
  			text-align: center;
  			font-size: 20px;
  		}
  	}
  }
 
</style>