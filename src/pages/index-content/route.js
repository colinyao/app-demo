import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import routes from './routeConfig'
const router = new Router({
    routes: [{path:'/',redirect:'/'+routes[0].name}].concat(routes.map(ele=>Object.assign(ele,{path:'/'+ele.id,component:()=>import('./scrollView')})))
})
console.log(router)
export default router
