<template>
	<div class="homeSubNavbar">
		<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll itemlist">
				<a v-for="item in  itemList" :key="item.id" @click="_clickItem(id)">
					{{item.name}}
				</a>
			</div>
		</div>
		<div class="addBtn"></div>
	</div>
</template>

<script>

export default {
  name: 'homeSubNavbar',
  data () {
    return {
       activeItem:0,
	   itemList:[{name:'推荐',id:0},{name:'附近',id:1},{name:'榜单',id:3},{name:'明星',id:4},{name:'搞笑',id:5},{name:'情感',id:6},{name:'新时代',id:7}]
    }
  },
  mounted(){
	mui('.mui-scroll-wrapper').scroll({
		 scrollY: false, //是否竖向滚动
		 scrollX: true, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: false, //是否显示滚动条
		 bounce: false //是否启用回弹
    });  
  },
	methods:{
		 _clickItem(id){
			  this.activeItem=id
		 }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/variables.less';
.homeSubNavbar{
	background:#fff;
}
.mui-scroll-wrapper{
	padding-left:15px;
}
.itemlist{
	white-space: nowrap;
	a{
		display: inline-block;
		font-size:14px;
		margin-right:25px;
		line-height: 40px;
		color:#333;
	}
} 
</style>
