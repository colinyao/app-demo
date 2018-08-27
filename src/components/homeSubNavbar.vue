<template>
    <div class="homeSubNavbar">
        <div class="shadow"></div>
        <div id="homeSubNavbar" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll itemlist">
                <a v-for="item in  activeItemList" :class="{'selected':currentVal==item.name}" :key="item.name" @click="_clickItem(item.name)">
                    {{item.label}}
                </a>
            </div>
        </div>
        <div class="addBtn" :class="{'active':showClassify}" @click="()=>{this.updateShowClassify(!this.showClassify)}">
            <span class="mui-icon mui-icon-plusempty"></span>
        </div>
        <div class="classify" :class="{'active':showClassify}">
            <div class="header">
                <p class="title">我的分类</p>
                <div class="btn-edit" @click="editStatus=!editStatus">{{editStatus?'完成':'编辑'}}</div>
            </div>
            <transition-group name="list-add" tag="ul" class="item-list item-added" v-drapEvent>
                <li class="item" :class="{'default':index===0,'selected':currentVal==item.name}" v-for="(item,index) in  activeItemList"
                    :key="item.name" @click="_clickAddedItem($event,item.name)">
                    <div @contextmenu.prevent class="drag-container">
                        <div class="drag-content" :class="{'default':index===0,'selected':currentVal==item.name}">
                            <i class="close-btn mui-icon mui-icon-close" v-show="editStatus&&item.name!=='recommend'" @click.stop="_deleteAddOne($event,index)"></i>
                            {{item.label}}
                        </div>
                    </div>
                </li>
            </transition-group>
            <div class="header">
                <p class="title">点击增加分类</p>
            </div>
            <transition-group name="list-wait" tag="ul" class="item-list item-waitAdd">
                <li class="item" v-for="(item,index) of waitItemList" :key="item.name" @click="_clickWaitItem($event,index)">
                    <span>{{item.label}}</span>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import {
        routesHash
    } from '../pages/index-content/routeConfig'
    import utils from '../assets/js/utils.js'
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    export default {
        name: 'homeSubNavbar',
        props: {
            value: {
                type: [Number, String]
            }
        },
        directives: {
            drapEvent: {
                bind: (el, binding, vnode) => {
                    let vm = vnode.context,
                        refuse = false,
                        flag = true;
                    let x, y, _x, _y, disX, disY, _disX, _disY,timer;
                    let reg = /translate3d\(([0-9.]{1,})\w+,\s+([0-9.]{1,})\w+,\s+0\w+\)/;
                    let waitAreaTop = '',
                        itemWidth = '',
                        itemHeight = '',
                        sourceData = []
                    el.ontouchstart = (e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        let target = e.target,
                            parent = e.target.parentNode,
                            targetClass = target.className,
							source=e.currentTarget.children,
							touch=e.touches[0]
                            reg = /translate3d\(([0-9.]{1,})\w+,\s+([0-9.]{1,})\w+,\s+0\w+\)/;

                        if (!vm.editStatus) {
                            timer = setTimeout(() => {
                                vm.editStatus = true;
                                touchStart(target, parent, touch)
                                startInit(target, parent,source)
                            }, 2000)
                            return
                        }
                        //默认元素非drag-content元素不能拖动
                        if (!~target.className.indexOf('drag-content') || !!~target.className.indexOf(
                                'default')) {
                            refuse = true;
                            return;
                        } else {
                            refuse = false;
                        }

                        if (!!~target.className.indexOf('drag-content')) {

                            touchStart(target, parent, touch)
                            startInit(target, parent,source)

                        }
                    }
                    function touchStart(target, parent, touch) {
                        let reg = /translate3d\(([0-9.]{1,})\w+,\s+([0-9.]{1,})\w+,\s+0\w+\)/;
                        x = touch.clientX;
                        y = touch.clientY;
                        itemWidth = itemWidth ? itemWidth : target.offsetWidth;
                        itemHeight = itemHeight ? itemHeight : target.offsetHeight;
                        let offset = utils.offset(target)
                        _disX = +offset.left || 0
                        _disY = +offset.top || 0
                        target.style =`position:fixed;z-index:6;left:${_disX}px;top:${_disY}px;width:${itemWidth}px;height:${itemHeight}px`
                    }

                    function startInit(target, parent,source) {
                        target.className = target.className ? target.className + ' touched' : 'touched';
                        parent.className = parent.className.replace(/\s?transition/, '');
						sourceData=keepSourceData(target, source)
                    }
                    let checkCarshFun = utils.throttle(checkCrash, 20)
                    el.ontouchmove = (e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        if (refuse) {
                            return;
                        }
                        let touch = e.changedTouches[0];
                        let target = e.target;
                        let parent = e.target.parentNode;
                        if (!vm.editStatus) {
                            touchStart(target, parent, touch)
                            return
                        }

                        _x = touch.clientX;
                        _y = touch.clientY;
                        disX = _x - x;
                        disY = _y - y;
                        target.style.top = disY + _disY + 'px';
                        target.style.left = disX + _disX + 'px';

                        let parentIndex = getIndex(parent, e.currentTarget.children);
                        checkCarshFun(parent, e.currentTarget.children, parentIndex)
                    }
                    el.ontouchend = (e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        if (refuse) {
                            return;
                        }
                        let touch = e.touches[0];
                        let target = e.target;
                        let parent = e.target.parentNode;
                        target.className = target.className.replace(/\s?touched/, '');
                        parent.className = parent.className ? parent.className + ' transition' : 'transition';
                        target.style = "position:relative;top:0px;left:0px;"

                    }

                    function getIndex(target, source) {
                        for (let i = 0, len = source.length; i < len; i++) {
                            if (source[i].children[0] === target) {
                                return i;
                            }
                        }
                    }


                    function switchPos(pos1, pos2, target) {
                        if (pos1 > pos2) {
                            vm.activeItemList.splice(pos2, 1, vm.activeItemList[pos1], vm.activeItemList[
                                pos2])
                            vm.activeItemList.splice(pos1 + 1, 1)
                        } else {
                            vm.activeItemList.splice(pos2, 1, vm.activeItemList[pos2], vm.activeItemList[
                                pos1])
                            vm.activeItemList.splice(pos1, 1)
                        }
                        target.className = target.className.replace(/\s?touched/, '');
                        //                         target.style.webkitTransform = target.style.webkitTransform.replace(
                        //                                 /translate3d\([\s\S]*\)/, '') + ' translate3d(' + disX + _disX + 'px,' + disY +
                        //                             _disY + 'px,0)';

                        vm.$nextTick(() => {
                            //去除transition抖动
                            target.parentNode.className = target.parentNode.className.replace(
                                /\s?list-add-move/, '');

                            //防止交换期间，多次触发碰撞
                            setTimeout(() => {
                                flag = true
                            }, 50)
                        })
                    }

                    function changeItem(targetIndex, targetLeft, targetTop,target,source) {
                        vm.waitItemList.push(vm.activeItemList.splice(targetIndex, 1)[0])
                        vm.$nextTick(() => {
                            let dom = document.getElementsByClassName('list-wait-enter')[0]
                            let _offset = utils.offset(dom)
                            let x = targetLeft - _offset.left
                            let y = targetTop - _offset.top

                            document.getElementsByClassName('list-add-leave-active')[0].className =
                                ''
                            // dom.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px,0)'
                            setTimeout(function () {
                                dom.style.top = '0px'
                                dom.style.left = '0px'
                            }, 50)
                            setTimeout(() => {
                                flag = true
                                sourceData = keepSourceData(target, source)
                            }, 500)
                        })
                    }

                    function keepSourceData(target, source) {
                        let sourceData = []
                        waitAreaTop = document.getElementsByClassName('item-waitAdd')[0].offsetTop
                        for (let i = 0, len = source.length; i < len; i++) {
                            let ele = source[i].children[0];
                            let sourceOffset = utils.offset(ele)
                            let sourceTop = sourceOffset.top;
                            let sourceLeft = sourceOffset.left;
                            sourceData.push({
                                ele: ele,
                                top: sourceTop,
                                left: sourceLeft
                            })
                        }
                        return sourceData
                    }

                    function checkCrash(target, source, targetIndex) {
                        let targetTop = disY + _disY;
                        let targetLeft = disX + _disX;
                        for (let i = 1, len = sourceData.length; i < len; i++) {
                            let sourceTop = sourceData[i].top;
                            let sourceLeft = sourceData[i].left;
                            if (sourceData[i].ele !== target && !((targetTop > (sourceTop + 1 / 3 *
                                    itemHeight)) || ((targetTop +
                                    itemHeight) < (sourceTop + 2 / 3 * itemHeight)) || (targetLeft > (
                                    sourceLeft + 1 / 3 * itemWidth)) || ((targetLeft + itemWidth) < (
                                    sourceLeft + 2 / 3 * itemWidth)))) {
                                if (flag) {
                                    //                                     x = x + sourceLeft - targetOffset.left
                                    //                                     y = y + sourceTop - targetOffset.top
                                    disX = _x - x
                                    disY = _y - y
                                    flag = false;
                                    switchPos(targetIndex, i, target, source)
                                }
                            }
                            if ((targetTop + itemHeight) > (+waitAreaTop +
                                    20)) {
                                if (flag) {
                                    flag = false
                                    changeItem(targetIndex, targetLeft, targetTop, target, source)
                                }

                            }
                        }
                    }
            

            }
        }
    },
    computed: {
            ...mapGetters(['showClassify'])
        },
        data() {
            return {
                currentVal: 0,
                editStatus: false,
                waitItemList: [],
                navbarWidth: 0,
                activeItemList: [{
                    label: '推荐',
                    name: 'recommend'
                }, {
                    label: '附近',
                    name: 'nearby'
                }, {
                    label: '榜单',
                    name: 'rank'
                }, {
                    label: '明星',
                    name: 'star'
                }, {
                    label: '搞笑',
                    name: 'funny'
                }, {
                    label: '情感',
                    name: 'emotion'
                }, {
                    label: '社会',
                    name: 'social'
                }, {
                    label: '电影',
                    name: 'movie'
                }, {
                    label: '汽车',
                    name: 'car'
                }, {
                    label: '游戏',
                    name: 'game'
                }, {
                    label: '美女',
                    name: 'beauty'
                }],
                pos: {}
            }
        },

        created() {
            this.currentVal = this.value
            this._waitItemList()
        },
        mounted() {
            mui('#homeSubNavbar').scroll({
                scrollY: false, //是否竖向滚动
                scrollX: true, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                bounce: false //是否启用回弹
            });
            this.navbarWidth = document.getElementById('homeSubNavbar').offsetWidth
        },
        methods: {
            ...mapMutations(['updateShowClassify']),
            _waitItemList() {
                let _routesHash = Object.assign({}, routesHash)
                this.activeItemList.forEach(ele => {
                    if (_routesHash[ele.name]) delete _routesHash[ele.name]
                })
                this.waitItemList = Object.keys(_routesHash).map(_ => ({
                    name: _,
                    label: _routesHash[_]
                }))
            },
            _clickItem(name) {
                this.currentVal = name
                this.$emit('input', name)

            },
            _clickAddedItem(e, name) {
                this.currentVal = name
                this.$emit('input', name)
                this.updateShowClassify(false)
            },
            _clickWaitItem(e, index) {
                this.activeItemList.push(this.waitItemList.splice(index, 1)[0])
                this.transformToAdd(e.target.parentNode)
            },
            _deleteAddOne(e, index) {
                this.waitItemList.push(this.activeItemList.splice(index, 1)[0])
                this.transformToWait(e.target.parentNode.parentNode)
            },
            transformToWait(node) {
                let offset = utils.offset(node)
                this.$nextTick(() => {
                    let dom = document.getElementsByClassName('list-wait-enter')[0]
                    let _offset = utils.offset(dom)
                    let x = offset.left - _offset.left
                    let y = offset.top - _offset.top
                    dom.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px,0)'
                    setTimeout(function () {
                        dom.style.webkitTransform = 'none'
                    }, 50)
                })

            },
            transformToAdd(node) {
                let offset = utils.offset(node)
                this.$nextTick(() => {
                    console.log(document.getElementsByClassName('list-wait-enter'))
                    let dom = document.getElementsByClassName('list-add-enter')[0]
                    let _offset = utils.offset(dom)
                    let x = offset.left - _offset.left
                    let y = offset.top - _offset.top

                    dom.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px,0)'
                    setTimeout(function () {
                        dom.style.webkitTransform = 'none'
                    }, 50)
                })
            }
        },
        watch: {
            value(newVal) {
                this.currentVal = newVal;
				this.$nextTick(()=>{
					let selectDom = document.querySelector('.itemlist .selected');
					let maxWidth=document.querySelector('.itemlist').offsetWidth-this.navbarWidth+70;
					console.log(this.navbarWidth)
					if (Math.abs((selectDom.offsetLeft + selectDom.offsetWidth / 2 + 20) - (this.navbarWidth - 70) / 2) >50) {
						var dis=-(selectDom.offsetLeft-(this.navbarWidth - 70) / 2);
						if(dis>0)dis=0;
						if(-dis>maxWidth)dis=-maxWidth;
						console.log(maxWidth)
						console.log(dis)
						mui('#homeSubNavbar').scroll().scrollTo(dis, 0, 200); //100毫秒滚动到顶
					}
				})
                

            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../assets/css/variables.less';
    .homeSubNavbar {
        background: #fff;
        position: fixed;
    }

    .mui-scroll-wrapper {
        position: fixed;
        z-index: 1;
        padding-left: 20px;
        padding-right: 50px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .mui-scroll {
        position: absolute;
        z-index: 2;
    }

    .itemlist {
        white-space: nowrap;
        a {
            display: inline-block;
            font-size: 14px;
            margin-right: 25px;
            line-height: 40px;
            color: #333;
        }
        .selected {
            color: @c2
        }
    }

    .default {
        opacity: 0.75
    }

    .shadow {
        position: absolute;
        height: 39px;
        width: 15px;
        top: 0;
        left: 0;
        z-index: 4;
        background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%);
        box-shadow: 5px -2px 5px rgba(255, 255, 255, 0.7)
    }

    .addBtn {
        line-height: 40px;
        width: 40px;
        position: absolute;
        z-index: 10;
        right: 0;
        top: 0;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.9);
        color: @c5;
        box-shadow: -1px -3px 5px #999;
        & span {
            font-size: 28px;
            line-height: 40px;
            vertical-align: top;
            transition: transform 0.3s;
        }
        &.active {
            box-shadow: none;
            span {
                transform: rotate3d(0, 0, 1, 45deg);
                transform-origin: center center;
            }
        }
    }

    .classify {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 5;
        padding: 0 15px;
        transform: translate3d(0, -100%, 0);
        transition: transform 0.3s;
        &.active {
            transform: translate3d(0, 0, 0);
        }
        .header {
            .vc;
            line-height: 40px;
            justify-content: space-between;
            p {
                .fs(@f12);
            }
            .btn-edit {
                color: @c2;
                .fs(@f12);
                margin-right: 40px;
            }
        }
        .item-added {
            position: relative;
            z-index: 1;
        }
        .item-list {
            .fs(@f12);
            margin-left: -12/16rem;
            .selected {
                color: @c2
            }
            li {
                margin-bottom: 6px;
                padding-left: 12/16rem;
                display: inline-block;
                line-height: 30px;
                width: 25%;
                text-align: center;
                .drag-content,
                span {
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    background: @c7;
                }
                & .close-btn {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-size: 1rem;
                    transform: translate3d(-50%, -50%, 0);
                }
            }
            .touched {
                animation: bigger 0.3s alternate;
                animation-fill-mode: both;
            }
            .transition {
                transition: transform 0.5s;
            }
            .list-add-move,
            .list-wait-move {
                transition: transform 0.5s;
            }

            .list-add-enter-to,
            .list-wait-enter-to {
                transition: transform 0.5s;
            }
            .list-add-leave-active,
            .list-wait-leave-active {
                position: absolute;
            }
        }
        @keyframes bigger {
            0% {
                transform: scale3d(1, 1, 1);
                opacity: 1;
            }
            100% {
                transform: scale3d(1.1, 1.1, 1);
                opacity: 0.8;
            }
        }
    }
</style>
