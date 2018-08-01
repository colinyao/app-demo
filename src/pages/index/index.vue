<template>
    <div class="wrapper">
        <homeNavbar></homeNavbar>
    </div>

</template>
<script>
    import homeNavbar from '~c/homeNavbar'

    export default {
        components: {
            homeNavbar
        },
        data() {
            return {
               activeSubItem:''
            }

        },
        mounted() {
            let subPages = [{
                url: './index-content.html', //下拉刷新内容页面地址
                id: 'index-content',
            }] //内容页面标志
            let styles = {
                top: '45px', //内容页面顶部位置,需根据实际页面布局计算，若使用标准mui导航，顶部默认为48px；
                bottom: '0px'
            }
            mui.init({
                subpages: subPages.map(ele=>Object.assign(ele,{styles:styles}))
            });
        },
        methods: {
            toMessage() {
                var webview = mui.openWindow({
                    url: 'message.html',
                    id: 'message.html'
                });
            }
        },
		watch:{
			activeSubItem(newVal){
				
			}
		}
    }
</script>
<style lang="less" scoped>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99999;
    }
</style>
