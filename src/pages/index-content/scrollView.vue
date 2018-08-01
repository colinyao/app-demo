<template>
    <div class="wrapper">
        <div id="refreshContainer" class="mui-content mui-scroll-wrapper home-wrapper">
            <div class="mui-scroll">
                <!--数据列表-->
                <ul class="mui-table-view mui-table-view-chevron">
                    <li v-for="item in itemList">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
		props:{
		   id:[String,Number]	
		},
        data() {
            return {
                itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, ]
            }
        },
        mounted() {
			
            if (this.$route.path === '/recommend') {
                mui.init({
                    pullRefresh: {
                        container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                        up: {
                            contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                            contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                            callback: this._pullup //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        },
                        down: {
                            style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                            callback: this._pulldown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        }

                    },
                });
                setTimeout(_ => {
                    mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
                }, 200)
            }
        },
        methods: {
            _pulldown() {
                setTimeout(() => {
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                }, 2000)
            },
            _pullup() {
                setTimeout(() => {
                    this.itemList = this.itemList.concat(this.itemList)
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh()
                    mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
                }, 2000)
            }
        },
		watch:{
			$route(newVal){
				console.log(newVal)
			}
		}
    }
</script>
<style lang="less" scoped>
    .home-wrapper {
        margin-top: 40px;
    }
</style>
