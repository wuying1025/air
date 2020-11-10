import Vue from 'vue'
import VueRouter from 'vue-router'
import Law from "./../views/law"

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/law',
    name: 'law',
    component:Law
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
