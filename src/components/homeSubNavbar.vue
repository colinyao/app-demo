<template>
    <div class="homeSubNavbar">
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll itemlist">
                <a v-for="item in  itemList" :class="{'selected':currentVal==item.id}" :key="item.id" @click="_clickItem(item.id)">
                    {{item.name}}
                </a>
            </div>
        </div>
        <div class="addBtn"></div>
    </div>
</template>

<script>
	import routes from '../pages/index-content/routeConfig'
    export default {
        name: 'homeSubNavbar',
        props: {
            value: {
                type: [Number, String]
            }
        },
        data() {
            return {
                currentVal: 0,
                itemList: routes
            }
        },
        created() {
            this.currentVal = this.val
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                scrollY: false, //是否竖向滚动
                scrollX: true, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                bounce: false //是否启用回弹
            });
        },
        methods: {
            _clickItem(id) {
                this.currentVal = id
                this.$emit('input', id)
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
    }

    .mui-scroll-wrapper {
        padding-left: 15px;
    }

    .itemlist {
        white-space: nowrap;
        a {
            display: inline-block;
            font-size: 14px;
            margin-right: 25px;
            line-height: 40px;
            color: #333;
            &.selected {
                color: @c2
            }
        }
    }
</style>
