<template>
	<figure class="lazy-scroller-container" ref="container">
         <slot></slot>
	</figure>
</template>
<script>
	export default{
		props:{
			limit:{
				default:20,
				type:Number
			}
		},
		mounted(){
            this.$on('childShow',_=>{
				let range=Math.ceil(this.limit/2),
				    start=_-range<0?0:_-range,
					end=_+range>this.$children.length?this.$children.length:_+range;
	   
				for(let ele of this.$children){
					if(ele.index>=start&&ele.index<end){
						if(!ele.status){
							ele.$emit('showChild',true)
						}
					}else{
						if(ele.status){
							ele.$emit('showChild',false)
						}
					}
					
				}
			})
		},
		methods:{
			
		}
	}
</script>
<style lang="less" scoped>
	figure{
		margin:0;
	}
</style>