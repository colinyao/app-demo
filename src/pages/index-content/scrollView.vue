<template>
    <div class="wrapper">
        <div id="refreshContainer" class="mui-content mui-scroll-wrapper home-wrapper">
            <div class="mui-scroll">
                <!--数据列表-->
                <ul class="mui-table-view mui-table-view-chevron">
                    <li v-for="item in itemList" :key="item.mblog.id">
						<div class="list-item">
							  <div class="item-header">
								    <div class="head-img"><img :src="item.mblog.user.profile_image_url" alt=""></div>
									<div class="user-info">
										<p class="userName"><span>{{item.mblog.user.screen_name}}</span><i class="badge"></i></p>
										<p class="other-info"><span>{{item.mblog.user.created_at}}</span> <span>{{item.mblog.source}}</span></p>
									</div>
							  </div>
						</div>
					</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import store from './store'
    import axios from 'axios'
    export default {
        data() {
            return {
                itemList: []
            }
        },
        computed: {
            pageId() {
                return this.$route.name
            }
        },
        mounted() {
            mui.init({
                pullRefresh: {
                    container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                    up: {
                        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                        contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: this._pullup, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；,
                        auto: true
                    },
                    down: {
                        style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                        callback: this._pulldown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    }
                }
            });
            setTimeout(_ => {
                mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
            }, 200)
        },
        methods: {
            _pulldown() {
                axios.post('/api/list').then(res => {
                    this.itemList = this.itemList.concat(res.data.data.list)
                    store.commit(`update${this.pageId}`, this.itemList)
                    setTimeout(() => {
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh()
                    }, 1000)
                })
            },
            _pullup() {
                axios.post('/api/list').then(res => {
                    this.itemList = this.itemList.concat(res.data.data.list)
                    store.commit(`update${this.pageId}`, this.itemList)
                    setTimeout(() => {
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh()
                        mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
                    }, 1000)
                })


            }
        },
        watch: {
            pageId(newVal) {
                this.itemList = store.getters[`get${newVal}`]
                mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 0)
                mui('#refreshContainer').pullRefresh().pulldownLoading();
            }
        }
    }
</script>
<style lang="less" scoped>
    .home-wrapper {
        top: 40px;
    }
	.head-img{
		width:2rem;
		height:2rem;
		& img{
			display: block;
			width:100%;
			height:100%;
			border-radius:100%;
		}
	}
</style>
