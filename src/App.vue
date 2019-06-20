<template>
  <div id="app">
    
    <!-- 一级路由 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
	body{

		/*background:linear-gradient(to right top,rgba(5,5,5,.1),white) no-repeat;*/
	}
	.auto-img{
		display: block;
		width: 100%;
	}
	
		.spirnner {
			position: fixed;
			top: 45%;
			left: 45%;
			z-index: 1000;
		}
</style>