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
        <div class="addBtn">
            <span class="mui-icon mui-icon-plusempty"></span>
        </div>
        <div class="classify">
            <div class="header">
                <p class="title">我的分类</p>
                <div class="btn-edit" @click="editStatus=true">编辑</div>
            </div>


            <transition-group name="flip-list" tag="ul" class="item-list item-added" v-drapEvent>
                <li :class="{'default':index===0,'selected':currentVal==item.name}" v-for="(item,index) in  activeItemList" :key="item.name"
                    @click="_clickAddedItem(item.name)">
                    <div @contextmenu.prevent class="drag-container">
                        <div class="drag-content">
                            <i class="close-btn mui-icon mui-icon-close" v-show="editStatus&&item.name!==recommend" @click.stop="_deleteAddOne(index)"></i>
                            {{item.label}}
                        </div>
                    </div>
                </li>
            </transition-group>
            <div class="header">
                <p class="title">点击增加分类</p>
            </div>
            <transition-group name="flip-list" tag="ul" class="item-list item-waitAdd">
                <li v-for="(item,index) of waitItemList" :key="item.name" @click="_clickWaitItem(index)">
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
                        flag = true;
                    let x, y, _x, _y, disX, disY, _disX, _disY;
                    let waitAreaTop = '',
                        itemWidth = '',
                        itemHeight = ''
                    el.ontouchstart = (e) => {
                        e.stopPropagation()
                        let target = e.target,
                            parent = e.target.parentNode,
                            reg = /translate3d\(([0-9.]{1,})\w+,\s+([0-9.]{1,})\w+,\s+0\w+\)/;
                        if (!!~target.className.indexOf('drag-content')) {
                            let touch = e.touches[0];
                            target.style.zIndex = '9999'
                            x = touch.clientX;
                            y = touch.clientY;
                            let trans = reg.exec(parent.style.webkitTransform) || []
                            if (trans.length) {
                                _disX = +trans[1]
                                _disY = +trans[2]

                            } else {
                                _disX = 0;
                                _disY = 0;
                            }
                            target.className = target.className ? target.className + ' touched' : 'touched';
                            parent.className = parent.className.replace(/\s?transition/, '');
                        }
                    }
                    el.ontouchmove = (e) => {
                        let touch = e.changedTouches[0];
                        let target = e.target.parentNode;
                        _x = touch.clientX;
                        _y = touch.clientY;
                        disX = _x - x;
                        disY = _y - y;

                        target.style.webkitTransform = target.style.webkitTransform.replace(
                            /translate3d\([\s\S]*\)/, '') + ' translate3d(' + (disX + _disX) + 'px,' + (
                            disY + _disY) + 'px,0)';
                        let targetIndex = getIndex(target, e.currentTarget.children);
                        checkCrash(target, e.currentTarget.children, targetIndex)
                    }
                    el.ontouchend = (e) => {
                        e.stopPropagation()
                        let touch = e.touches[0];
                        let target = e.target;
                        let parent = e.target.parentNode;
                        target.className = target.className.replace(/\s?touched/, '');
                        parent.className = parent.className ? parent.className + ' transition' : 'transition';
                        parent.style.webkitTransform = parent.style.webkitTransform.replace(
                            /translate3d\([\s\S]*\)/, '') + ' translate3d(0px,0px,0px)';
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
                            vm.activeItemList.splice(pos2, 1, vm.activeItemList[pos1], vm.activeItemList[pos2])
                            vm.activeItemList.splice(pos1 + 1, 1)
                        } else {
                            vm.activeItemList.splice(pos2, 1, vm.activeItemList[pos2], vm.activeItemList[pos1])
                            vm.activeItemList.splice(pos1, 1)
                        }
                        target.className = target.className.replace(/\s?touched/, '');
                        target.style.webkitTransform = target.style.webkitTransform.replace(
                                /translate3d\([\s\S]*\)/, '') + ' translate3d(' + disX + _disX + 'px,' + disY +
                            _disY + 'px,0)';

                        vm.$nextTick(() => {
                            //去除transition抖动
                            target.parentNode.className = target.parentNode.className.replace(
                                /\s?flip-list-move/, '');
                            //更新
                            waitAreaTop = document.getElementsByClassName('item-waitAdd')[0].offsetTop
                            //防止交换期间，多次触发碰撞
                            setTimeout(() => {
                                flag = true
                            }, 500)
                        })
                    }

                    function changeItem(targetIndex) {
                        vm.activeItemList.splice(targetIndex, 1)
                        vm.$nextTick(() => {
                            setTimeout(() => {
                                flag = true
                            }, 200)

                        })
                    }

                    function offset(curEle) {
                        var totalLeft = null,
                            totalTop = null,
                            par = curEle.offsetParent;
                        //首先加自己本身的左偏移和上偏移
                        totalLeft += curEle.offsetLeft;
                        totalTop += curEle.offsetTop
                        //只要没有找到body，我们就把父级参照物的transition-group边框和偏移也进行累加
                        while (par) {
                            //累加父级参照物本身的偏移
                            totalLeft += par.offsetLeft;
                            totalTop += par.offsetTop
                            par = par.offsetParent;
                        }

                        return {
                            left: totalLeft,
                            top: totalTop
                        }
                    }



                    function checkCrash(target, source, targetIndex) {
                        let targetOffset = offset(target)
                        let targetTop = targetOffset.top + disY + _disY;
                        let targetLeft = targetOffset.left + disX + _disX;
                        itemWidth = itemWidth ? itemWidth : target.offsetWidth;
                        itemHeight = itemHeight ? itemHeight : target.offsetHeight;
                        waitAreaTop = document.getElementsByClassName('item-waitAdd')[0].offsetTop
                        for (let i = 0, len = source.length; i < len; i++) {
                            let ele = source[i].children[0];
                            let sourceOffset = offset(ele)
                            let sourceTop = sourceOffset.top;
                            let sourceLeft = sourceOffset.left;

                            if (ele !== target && !((targetTop > (sourceTop + 1 / 3 * itemHeight)) || ((targetTop +
                                    itemHeight) < (sourceTop + 2 / 3 * itemHeight)) || (targetLeft > (
                                    sourceLeft + 1 / 3 * itemWidth)) || ((targetLeft + itemWidth) < (
                                    sourceLeft + 2 / 3 * itemWidth)))) {
                                if (flag) {
                                    x = x + sourceLeft - targetOffset.left
                                    y = y + sourceTop - targetOffset.top
                                    disX = _x - x
                                    disY = _y - y
                                    flag = false;
                                    switchPos(targetIndex, i, target)
                                }
                            }

                            if ((targetTop + itemHeight) > (+waitAreaTop +
                                    20)) {
                                if (flag) {
                                    flag = false
                                    changeItem(targetIndex)
                                }

                            }
                        }

                    }
                }
            }
        },
        data() {
            return {
                currentVal: 0,
                editStatus: false,
                waitItemList: [],
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
                }]
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
        },
        methods: {
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
            _clickAddedItem(name) {
                this.currentVal = name
                this.$emit('input', name)
            },
            _clickWaitItem(index) {

                this.activeItemList.push(this.waitItemList.splice(index, 1)[0])
            },
            _deleteAddOne(index) {
                this.waitItemList.push(this.activeItemList.splice(index, 1)[0])
            }

        },
        watch: {
            value(newVal) {
                this.currentVal = newVal
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import '../assets/css/variables.less';
    .homeSubNavbar {
        background: #fff;
        position: fixed;
    }

    .mui-scroll-wrapper {
        position: fixed;
        padding-left: 20px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .mui-scroll {
        position: absolute;
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
    }

    .selected {
        color: @c2
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
        z-index: 6;
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
        }
        .touched {
            animation: bigger 0.5s alternate;
            animation-fill-mode: both;
        }
        .transition {
            transition: all 0.3s;
        }
        .flip-list-move {
            transition: all 0.5s;
        }
        .flip-list-leave-active {
            transition: all 1s;
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
