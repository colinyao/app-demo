<template>
    <figure class="lazy-component" ref="component" :style="{'min-height':height+'px'}">
        <transition name="fade">
            <figure v-if="status">
                <slot></slot>
            </figure>
        </transition>
    </figure>
</template>
<script>
    export default {
        props: {
            ind: [Number]
        },
        data() {
            return {
                status: false,
				cacluateStatus:false,
                height: 100
            }
        },
        mounted() {
            var io = new IntersectionObserver(this.observe);
            io.observe(this.$refs.component);
            this.$on('showChild', _ => {
                this.status = _
            })
        },
        methods: {
            observe(entries) {
                if (entries[0].intersectionRatio > 0) {
                    this.$parent.$emit('childShow', this.ind)
                }
            }
        },
        watch: {
            status(newVal) {
                this.$nextTick(() => {
                    if (newVal && !this.cacluateStatus) {
                        this.height = this.$refs.component.offsetHeight;
						this.cacluateStatus=true;
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .lazy-component {
        background: #fff;
    }

    figure {
        margin: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */

    {
        opacity: 0;
    }
</style>
