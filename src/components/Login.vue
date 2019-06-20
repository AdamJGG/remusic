<template>
	<div class="login">
		<div class="nav">
			<span @click="goState">注册</span>
		</div>
		<div class="logo">
			<img class="auto-img logoimg" src="http://127.0.0.1:8085/images/logo.png"/>
		</div>
		<van-row>

			<van-col offset="2" span="20">
				<van-cell-group>
					<van-field label='手机号' v-model="userInfo.phone" placeholder="请输入手机号" />
					<van-field label='密码' v-model="userInfo.pwd" placeholder="请输入密码(8-16位)" type='password' />
					</van-field>
				</van-cell-group>
				<van-button class="login-btn" size="large" type="info" @click='login'>登录</van-button>

			</van-col>
		</van-row>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { CellGroup, Field, Button, Dialog } from 'vant'
	Vue.use(Dialog)
	import validForm from '../util/validForm.js'
	export default {
		name: 'Login',

		data() {
			return {
				validCode: '',
				
				//用户列表
				users: [],

				userInfo: {
					phone: '',
					pwd: ''
				}

			}
		},
		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button
			//			[Dialog.name]:Dialog
		},
		methods: {
			login() {
				if(!validForm.validPhone(this.userInfo.phone)) {
					Dialog.alert({
						title: '手机号码不正确'
					}).then(() => {
						this.userInfo.phone = ''
					})
				} else if(!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
					Dialog.alert({
						title: '密码仅支持以 !_@.字母,数字开头'
					}).then(() => {
						this.userInfo.pwd = ''
					})
				} else {
					var userData = localStorage.getItem('users')
					if(userData) {
						//如果存在任何用户
						this.users = JSON.parse(userData)
						console.log(this.users)
						for(var i = 0; i < this.users.length; i++) {
							if(this.users[i].phone == this.userInfo.phone) {
								
								if(this.users[i].pwd == this.userInfo.pwd) {
									this.$router.push({name: 'Frist'})
									console.log(this.users)
									return
								} else {
									Dialog.alert({
										title: '手机号码或者密码不正确'
										
									})
									return
								}
							}

						}
					}
					//该用户不存在
					Dialog.alert({title: '该用户不存在！'})
				}
			},
			goState(){
				this.$router.push({name:'Register'})
			}

		}
	}
</script>

<style lang="less" scoped>
	.login{
		    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background:url(../assets/step4_bg.jpg) -10px;
	}
	.login-btn {
		margin-top: 1.3333rem;
		/*background-color: #33363F;*/
		border: none;

		background: linear-gradient(to right bottom, #D43C33, #E21918 70%);
		
		text-shadow: 0 0 5px black;
	}
	
	.logo {
		width: 4rem;
		/*height:50px;*/
		margin: 0 auto;
		/*background:url(../assets/logo.jpg) no-repeat;*/
		background-size: cover;
		padding-bottom: 1rem;
	}
	.logoimg{
		border-radius: 50%;
	}
	
	.nav {
		height: 1.333rem;
		background: linear-gradient(to top,#D21418,#d43c33);

		margin-bottom: 1.33rem;
		span {
			color: white;
			float: right;
			width: 1rem;
			text-align: center;
			margin: 10px;
			font-size: 14px;
		}
	}
	.van-cell-group{
		background:rgba(255,255,255,.1);

		
	}
	.van-cell{
		background:rgba(255,255,255,.1);
		border-bottom: 1px solid #CCCCCC;
		
	}
</style>