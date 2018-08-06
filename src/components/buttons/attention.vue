<template>
	<span class="attention-btn" :class="{'attented':status===1,'attenting':status===2}" @click="_click">
		<i class="mui-icon mui-icon-spinner-cycle mui-spin" v-show="status===2"></i>
		<i class="mui-icon mui-icon-plusempty" v-show="status===0"></i><span v-show="status===0">关注</span>
		<span v-show="status===1">已关注</span>
	</span>
</template>
<script>
	export default{
		props:{
			status:{
				default:0,
				type:Number
			},  //0未关注,1已关注,2关注中     
		},
		methods:{
			_click(){
				this.$emit('click')
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/css/variables.less';
	.attention-btn{
		display:inline-block;
		.vc;
		color:@c2;
		border:1px solid @c2;
		border-radius: 2px;
		.fs(@f12);
		line-height:24/16rem;
		padding:0 8/16rem 0 0;
	}
	.attenting,.attented{
		color:@c5;
		border-color:@c5;
		padding:0 10/16rem;
	}
	.mui-icon{
		line-height:24/16rem;
	}
	.mui-icon-spinner-cycle{
		font-size:16/16rem;
		.animate-circle;
	}
	.mui-icon-plusempty{
		font-size:22/16rem;
	}
</style>