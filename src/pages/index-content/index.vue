<template>
    <div class="wrapper">
		<homeSubNavbar class="subBar" v-model="activeSubItem"></homeSubNavbar>
        <keep-alive>
			<router-view :key="activeSubItem" :id="activeSubItem"></router-view>
		</keep-alive>
    </div>
</template>
<script>
	import homeSubNavbar from '~c/homeSubNavbar'
    export default {
		components: {
			homeSubNavbar
		},
        data() {
            return {
				activeSubItem:''
            }
        },
        mounted() {

        },
        methods: {
         
        },
		watch:{
			activeSubItem(newVal){

				this.$router.push({path:'/'+newVal})
			}
		}
    }
</script>
<style lang="less" scoped>
	.wrapper{
		position: absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
	}
	.subBar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 40px;
		z-index:3;
		border-bottom: 1px solid #eee;
	}
</style>
