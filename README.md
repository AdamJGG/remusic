## 用户列表 users = [user1, user2, ...]
```javascript
user1 : {
	uid: '用户id',
	phone: '手机号用户登录账号',
	pwd: '用户密码',
	registerTime: '注册时间 2019-03-10 12:10:19'
}
```
## vue-axios
```txt
vue-axios:ajax请求

axios({
	methods:请求类型,(get 或者 post)
	
	data:参数字符串或者对象 //name = Adam&age=10 ，
	
	请求路径
})
```
```txt
   搜索历史
   searchHistory:[
   {
    userId:'用户Id',
   	keyWords:['a','b']
   }
   ]
```