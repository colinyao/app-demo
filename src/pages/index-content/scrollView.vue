<template>
    <div class="wrapper">
        <div id="refreshContainer" class="mui-content mui-scroll-wrapper home-wrapper">
            <div class="mui-scroll">
                <!--数据列表-->
                <div class="mui-table-view mui-table-view-chevron">
                    <lazyScroller>
                        <lazyComponent class="mt10" v-for="(item,index) in itemList" :ind='index' :key="item.mblog.id">
                            <div class="list-item">
                                <div class="item-head">
                                    <div class="head-img">
                                        <img :src="item.mblog.user.profile_image_url" alt="">
                                    </div>
                                    <div class="user-info">
                                        <p class="userName">
                                            <span>{{item.mblog.user.screen_name}}</span>
                                            <i class="badge"></i>
                                        </p>
                                        <p class="other-info">
                                            <span>{{item.mblog.created_at}}</span>
                                            <span>{{item.mblog.source}}</span>
                                        </p>
                                    </div>
                                    <div class="operates">
                                        <attentionBtn @click="_clickAttentionBtn(item.mblog.user)" :status="item.mblog.user.follow_me?(item.mblog.user.follow_me===2?2:1):0"></attentionBtn>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <p class="description" v-html="item.mblog.text"></p>
                                    <div class="imgs">
                                        <div class="my-gallery" :data-pswp-uid="1" itemscope itemtype="http://schema.org/ImageGallery">
                                            <img class="previewer-demo-img" v-for="(_item, _index) in list" :key="'img'+_index+item.mblog.id" :id="'img'+_index+item.mblog.id" :src="_item.src" width="100" @click="show(_index,'img'+_index+item.mblog.id)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </lazyComponent>
                    </lazyScroller>
                </div>
            </div>
        </div>
        <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
</template>
<script>
    import store from './store'
    import axios from 'axios'
    import lazyScroller from '~c/lazyScroller.vue'
    import lazyComponent from '~c/lazyComponent.vue'
    import previewer from '~c/previewer.vue'
    import attentionBtn from '~c/buttons/attention.vue'
    export default {
        components: {
            lazyScroller,
            lazyComponent,
            attentionBtn,
            previewer
        },
        data() {
            return {
				ws:'',
                itemList: [],
				activeImgId:'',
                list: [{
                        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
                        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
                        w: 800,
                        h: 400
                    },
                    {
                        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
                        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
                        w: 1200,
                        h: 900
                    }, {
                        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
                        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
                    }
                ],
                
            }
        },
        computed: {
            pageId() {
                return this.$route.name
            },
			options() {
				return {getThumbBoundsFn:(index)=>{
			
					// find thumbnail element
					let thumbnail='';
					let thumbnails = document.querySelectorAll('.previewer-demo-img')
					for(let ele of thumbnails){
						if(ele.id===this.activeImgId){
							thumbnail=ele;
							break;
						}
					}
					// get window scroll Y
					let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
					// optionally get horizontal scroll
					// get position of element relative to viewport
					let rect = thumbnail.getBoundingClientRect()
					// w = width
					return {
						x: rect.left,
						y: rect.top + pageYScroll,
						w: rect.width
					}
					// Good guide on how to get element coordinates:
					// http://javascript.info/tutorial/coordinates
				}
				}
			}
        },
        created() {
            // H5 plus事件处理
			mui.plusReady(()=>{	
				 this.ws = plus.webview.currentWebview();
			});
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
            this.$refs.previewer.$on('on-close',()=>{
				if(this.ws){
					this.ws.setStyle({
						top: '45px'
					});
				}
			})
			
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
            },
            _clickAttentionBtn(opts) {
                if (opts.follow_me === false) {
                    opts.follow_me = 2
                    setTimeout(() => {
                        axios.post('/api/attention').then(res => {
                            if (res.data.code == '200') {
                                opts.follow_me = 1
                            }
                        })
                    }, 1000)
                }
            },
            show(index,id) {
				if(this.ws){
					this.ws.setStyle({
						top: '0px'
					});
				}
				this.activeImgId=id
                this.$refs.previewer.show(index)
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
    @import '../../assets/css/variables.less';
    .mui-table-view {
        background: transparent;
        margin-top: 40px;
    }
    .list-item {
        background: #fff;
        .pd10;
    }
    .item-head {
        display: flex;
    }
    .head-img {
        width: 2rem;
        height: 2rem;
        margin-right: 10px;
        & img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }
    .user-info {
        flex: 1;
        .userName {
            color: @c2;
            .fs(@f14);
        }
        .other-info {
            span {
                .fs(@f12);
            }
        }
    }
    .description {
        .fs(@f14);
    }
    /deep/ .mui-pull-top-pocket {
        top: 40px;
    }
</style>