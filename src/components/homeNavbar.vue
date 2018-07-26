<template>
	<navbarTpl>
		  <li class="mui-icon mui-icon-camera" slot="left"></li>
			<li slot="center"  :class="{'active':activeItem===item.id}" v-for="item in itemList" :key="item.id" @click="_clickItem(item.id)"><span>{{item.name}}</span></li>
			<li slot="right"></li>
	</navbarTpl>
</template>

<script>
import navbarTpl from './navbarTpl'
export default {
  name: 'homeNavbar',
	components:{navbarTpl},
  data () {
    return {
       activeItem:0,
			 itemList:[{name:'关注',id:0},{name:'热门',id:1}]
    }
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
.itemList{
	li{
		 .ml10;
		 .mr10;
		 .c5;
		 .rel;
	}
	li.active{
		font-weight: bold;
		color:#000;
		&:after{
			content:'';
			display: block;
			position:absolute;
			bottom:5px;
			height:2px;
			width:100%;
			border-radius: 1px;
			background:@c6;
		}
	}
	li:first-child.active{
		&:after{
			background:@c3;
		}
	}
}
</style>
