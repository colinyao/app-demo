<template>
    <figure class="lazy-scroller-container" ref="container">
        <slot></slot>
    </figure>
</template>
<script>
    import utils from '../assets/js/utils.js'
    export default {
        props: {
            limit: {
                default: 20,
                type: Number
            }
        },
        mounted() {
            let callback = utils.debounce((_) => {
				
                let range = Math.ceil(this.limit / 2),
                    start = _ - range < 0 ? 0 : _ - range,
                    end = _ + range > this.$children.length ? this.$children.length : _ + range;

                for (let ele of this.$children) {
                    if (ele.ind >= start && ele.ind < end) {
                        if (!ele.status) {
                            ele.$emit('showChild', true)
                        }
                    } else {
                        if (ele.status) {
                            ele.$emit('showChild', false)
                        }
                    }

                }
            })
            this.$on('childShow', _ => callback(_))
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    figure {
        margin: 0;
    }
</style>
