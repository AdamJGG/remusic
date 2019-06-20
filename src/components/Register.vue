<template>
	<div class="register">
		<div class="nav">
			<span @click="goState">登录</span>
		</div>
		<div class="logo">
			<img class="auto-img logoimg" src="http://127.0.0.1:8085/images/logo.png"/>
		</div>
		<van-row>

			<van-col offset="2" span="20">
				<van-cell-group>
					<van-field label='手机号' v-model="userInfo.phone" placeholder="请输入手机号" />
					<van-field label='密码' v-model="userInfo.pwd" placeholder="请输入密码(8-16位)" type='password' />
					<van-field label='确认密码' v-model="userInfo.repwd" placeholder="再次输入密码" type='password' />
					<van-field label='短信验证码' v-model="userInfo.validcode" placeholder="请输入验证码">
						<van-button slot="button" size="small" type="primary" @click='getValidCode' :disabled='isDisabled'>{{validCodeText}}</van-button>
					</van-field>
				</van-cell-group>
				<van-button class="register-btn" size="large" type="info" @click="
			regitser">注册</van-button>

			</van-col>
		</van-row>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { CellGroup, Field, Button, Dialog } from 'vant'
	Vue.use(Dialog)
	import validForm from '../util/validForm.js'
	import tool from '../util/tool.js'
	
	export default {
		name: 'Register',

		data() {
			return {
				validCode: '',

				validCodeText: '发送验证码',

				isDisabled: false,

				//用户列表
				users: null,

				userInfo: {
					phone: '',
					pwd: '',
					repwd: '',
					validcode: ''
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
			regitser() {

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
				} else if(!validForm.validEqual(this.userInfo.pwd,
						this.userInfo.repwd)) {
					Dialog.alert({
						title: '两次密码不一致！！'
					}).then(() => {
						this.userInfo.repwd = ''
					})
				} else if(this.userInfo.validcode.length == 6 && !validForm.validEqual(this.userInfo.validcode, this.validCode)) {
					//验证密码
					Dialog.alert({
						title: '验证码不正确'
					}).then(() => {
						this.userInfo.validcode = '';
					})
				} else {///
										//存储之前需要验是否存在该用户
					for (var i = 0; i < this.users.length; i++) {

						if (this.users[i].phone == this.userInfo.phone) {
							tip.dialogTip('该手机号已被注册');
							return;
						}

					}

					//如果不存在该用户, 添加一个用户到用户列表users
					//生成用户id
					var time = new Date();
					var uid = 'vue' + time.getTime();
					var phone = this.userInfo.phone;
					var pwd = this.userInfo.pwd;
					var registerTime = tool.format(time, 'yyyy-MM-dd hh:mm:ss');

					var user = {
						uid,
						phone,
						pwd,
						registerTime
					};

					this.users.push(user);
					var usersData = JSON.stringify(this.users);

					//写入本地存储users
					localStorage.setItem('users', usersData);

					//跳转到登录组件
					this.$router.push({name: 'Login'});

				}///
			},
			//				获取验证码
		getValidCode() {
			if(!validForm.validPhone(this.userInfo.phone)) {
				Dialog.alert({
					title: '手机号码不正确'
				}).then(() => {
					this.userInfo.phone = ''
				})
			} else {
				this.isDisabled = true;

				//5秒后自动恢复
				var time = 15;

				this.validCodeText = time + 's后重新发送';

				var timer = setInterval(() => {

					if(time <= 0) {

						this.isDisabled = false;

						this.validCodeText = '发送验证码';

						//清除定时器
						clearInterval(timer);
						time = null;

					} else {

						this.validCodeText = --time + 's后重新发送';

					}
				}, 1000)
				this.validCode = validForm.generateValidCode()
				console.log(this.validCode)
			}

		},
		goState(path){
			
			this.$router.push({name:'Login'})
		}
		
		},
		created() {
			var userData = localStorage.getItem('users');

			this.users = userData == undefined ? [] : JSON.parse(userData)
		}
	}
</script>

<style lang="less" scoped>
		.register{
		    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background:url(../assets/step4_bg.jpg) -150px -20px;
	}
	
	.register-btn {
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
		background:rgba(255,250,250,.3);

		
	}
	.van-cell{
		background:rgba(255,200,200,.1);
		border-bottom: 1px solid rgba(255,200,200,.1);
		
	}
</style>