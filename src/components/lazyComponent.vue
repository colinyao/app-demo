<template>
	<figure class="lazy-component" ref="component">
		<transition  name="fade">
			<figure v-if="status">
				<slot></slot>
			</figure>
		</transition>
		
	</figure>
</template>
<script>
	export default{
		props:{
			index:[Number]
		},
		data(){
		   return{
			   status:false
		   }	
		},
		mounted(){
			var io = new IntersectionObserver(this.observe);
			io.observe(this.$refs.component);
			this.$on('showChild',_=>{
				this.status=_
			})
		},
		methods:{
			observe(entries){
				if(entries[0].intersectionRatio>0){
				    this.$parent.$emit('childShow',this.index)
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.lazy-component{
		height:80px;
		background:#ddd;
	}
	figure{
		margin:0;
	}

	.fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
       opacity: 0;
    }
</style>