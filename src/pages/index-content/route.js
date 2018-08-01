import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    routes: [{
        path: '/',
        name: 'recommend',
        component: () =>
            import ('./recommend'),
        title: '推荐'
    }]
})

export default router
