import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: ()=>import('@/views/login/login.vue'),
  //   children:[{
  //     path:'/',
  //     name:'home',
  //     component:()=>import('../views/home/home.vue')
  //   },{
  //     path:'/user',
  //     name:'User',
  //     component:()=>import('../views/user/user.vue')
  //   },{
  //     path:'/mall',
  //     name:'Mall',
  //     component:()=>import('../views/mall/mall.vue')
  //   }
  // ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
