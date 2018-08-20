<template>
    <div class="wrapper">
		<homeSubNavbar ref="homeSubNavbar" class="subBar" v-model="activeSubItem"></homeSubNavbar>
        <keep-alive>
			<router-view></router-view>
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
				activeSubItem:'recommend'
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
