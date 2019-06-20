<template>
	<div class="accounts">
		<van-row class='cls'>
			<van-col span='3'>
				<i class="iconfont icon-guanyu"></i>
			</van-col>
			<van-col span='18'><span class="account">账号</span></van-col>
			<van-col span='3'>
				<i class="iconfont icon-yinliang"></i>
			</van-col>
		</van-row>
		<van-row class='imsg'>
			<van-col span='6'>
				<div>
					<img class="auto-img aa" src="../assets/gedan-01.jpg" />

				</div>

			</van-col>
			<van-col span='10' class="id">范丞丞</van-col>
			<van-col span='6' class='sign' @click='outlogin'><i class="iconfont icon-integral"> 签到</i></van-col>
		</van-row>
		<ul>

			<li>动态 <b> 100</b></li>
			<li>关注 <b> 4</b></li>
			<li>粉丝 <b> 1w</b></li>
			<li>我的资料 <b> 0</b></li>
		</ul>
	
		<van-cell-group class='cont1' v-for="(item,index) in list":key="index">
			<van-cell class="cell" :title="item.title" :value="item.value" />

		</van-cell-group>

		<van-button class="unlogin-btn" size="large" type="info" @click="outlogin">退出登录</van-button>
			


	</div>
</template>

<script>
	import Vue from 'vue'
	import { Button, Cell, CellGroup } from 'vant'
	Vue.use(Cell).use(CellGroup);
	//	import { ImagePreview } from 'vant';

	export default {
		name: 'Accounts',
		data(){
			return{
				list:[
				{title:"消息",value:"1 >"},
				{title:"会员中心", value:"1 >"},
				{title:"商城", value:"106 >" },
				{title:"精品游戏推荐", value:"缤纷圣诞焕彩上新 >" },
				{title:"在线听歌免流量", value:"专辑/歌手/视频/专栏 >"},
				{title:"设置",value:">"},
				{title:"扫一扫", value:" >" },
				{title:"扫一扫" ,value:" >"},
				{title:"个性换肤" ,value:"官方红 >"},
				{title:"夜间模式", value:">" },
				{title:"亲子频道", value:">"},
				{title:"定时闹钟", value:">"},
				{title:"加入网易云音乐人", value:" >"},
				{title:"分享网易云音乐", value:" >"},
				{title:"关于", value:">"}
				]
			}
		},
		methods: {
			outlogin() {
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

<style lang="less" scoped>
.cls {
		width: 100%;
		text-align: center;
		height: 1.4rem;
		background: #D43C33;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}
	
	.iconfont {
		font-weight: normal;
		color: white;
		font-size: 1rem;
		line-height: 1.4rem;
		float: left;
	}
	.accounts {
    position: absolute;
    top: 0;
    padding-top: 1.4rem;
    padding-bottom: 1.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #F0F0F0;
    	.imsg {
		height: 2.5rem;
		background: #FFFFFF;
		border-bottom: 1px solid #F0F0F0;
		line-height: 2.5rem;
	}
	ul{
		width: 100%;
		height: 1.4rem;
		background: #FFF;
		padding-top: unset;
		overflow: hidden;
		text-align: center;
		color: rgba(0, 0, 0, .8);
		
	}

.van-button--info {
	background: #F5F5F5;
	color: #D43C33;
	border: none;
	margin-bottom: 1.5rem;
}

	
}
	.icon-guanyu {
		padding-left: .25rem;
	}
	.account{
		font-weight: normal;
		line-height: 1.4rem;
		font-size: .5rem;
		color: #fff;
	}
	b {
		font-weight: normal;
		color: black;
		font-size: .2rem;
		line-height: .5rem;
	}
	

	
	.aa {
		padding: 0.4rem;
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
		height: 100%;
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

li {
    display: inline-block;
    width: 25%;
    position: relative;
    top: 0;
    left: 0;
    line-height: 1.4rem;
    box-sizing: border-box;
    padding-top: unset;
}

.icon-xiaoxi {
	color: #CCCCCC;
	font-size: .5rem;
	padding-left: 0.1rem;
}

</style>