<template>
	<div class="test">
		<div>
			<router-view></router-view>

		</div>

		<van-row class="tabs" type="flex" justify="center" align="center">
			
			<van-tabbar  v-model="active">
				<van-tabbar-item :icon="item.icon" v-for="(item,index) in tabs" :key="index" @click="goState(item.path)" :active="item.active">
				
					{{item.title}}
				</van-tabbar-item>
			</van-tabbar>
		</van-row>

	</div>

</template>

<script>
	import { Field } from 'vant';

	export default {
		name: 'Test',
		data() {
			return {
				checked: true,
				value: 1,
				active:0,
				tabs:[
				{title:"发现",icon:'search',path:{name:'Frist'},flag:'/frist'},
				{title:"视频",icon:'friends-o',path:{name:'Video'},flag:'/video'},
				{title:"我的",icon:'home-o',path:{name:'Mine'},flag:'/mine'},
				{title:"账号",icon:'setting-o',path:{name:'Accounts'},flag:'/accounts'}
				]
			}
		},

		components: {
			//局部组件使用vant组件
			[Field.name]: Field,
			
		},
		methods: {
			goState(path) {
				this.$router.push(path)
			}
		},
		created(){
			var active = this.$route.query.active
			this.active = active == undefined ? 0 : Number(active)
			
			var hash = location.hash
			console.log("hash==>",hash)
			
			for(var i = 0; i < this.tabs.length; i++){
				if(hash.indexOf(this.tabs[i].flag)>-1){
					this.active = i
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@c: #e4393c;
	.test {
		.title {
			color: @c;
		}
	}
	
	.box {
		width: 200px;
		height: 200px;
		border: 2px solid royalblue;
		letter-spacing: 10px;
	}
	
	.tabs {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1.3866rem;
		background: #F0F0F0;
		color: #D43C33;
		text-align: center;
		font-size: 14px;
	}
	
	.test .tabs>div.active {
		color: #E4393C;
	}
	.van-tabbar-item--active{
		color: #D43C33;
	}
	.van-tabbar{
		padding-top:.1rem ;
		background: #F0F0F0;
	}
</style>