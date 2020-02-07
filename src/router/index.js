import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import Remove from '../views/Remove.vue'
import Movement from '../views/Movement.vue'
import Orders from '../views/Orders.vue'
import Stock from '../views/Stock.vue'
import Supplies from '../views/Supplies.vue'
import Login from '../views/Login.vue'
import AddContact from '../views/AddContact.vue'
import firebase from '../../firebase/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'KEA Warensystem',
      requiresAuth: true
    }
  },
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/remove',
    name: 'remove',
    component: Remove,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/movement',
    name: 'inward',
    component: Movement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stock',
    name: 'stock',
    component: Stock,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/supplies',
    name: 'supplies',
    component: Supplies,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-contact',
    name: 'AddContact',
    component: AddContact,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router
