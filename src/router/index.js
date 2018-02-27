import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/Home.vue'

import LoginMain from '@/components/login/main.vue'
import orgMain from '@/components/orgManageMent/main.vue'
import userMain from '@/components/userManageMent/main.vue'

Vue.use(Router)

const loginRoute =  {
  path: '/login',
  component: LoginMain,
  name: '',
  hidden: true,
  beforeEnter(to, from, next) {
    localStorage.removeItem('authorization');
    localStorage.removeItem('permission');
    next();
  }
}

function getAfterRoutes(){
  return [
    {
      path: '/',
      name: '机构管理',
      redirect: '/orgManageMent',
      iconCls: 'el-icon-message',
      hidden: false,
      component: Home,
      children: [
        {path: '/orgManageMent', hidden: false, component: orgMain, name: '机构管理主界面'},
        // {path: '/orgInvite', hidden: false, component: orgInvite, name: '邀请机构'}
      ]
    },
    {
      path: '/',
      name: '人员管理',
      redirect: '/userManageMent',
      iconCls: 'el-icon-message',
      hidden: false,
      component: Home,
      children: [
        {path: '/userManageMent', hidden: false, component: userMain, name: '人员管理主界面'}
      ]
    }
  ]
}

let router = new Router({
  routes: [
    loginRoute
  ]
})

function setRoutes() {
  router.addRoutes(getAfterRoutes())
  console.log(router);
  router.options.routes = getAfterRoutes();
}

router.beforeEach((to, from, next) => {
  let authorization = localStorage.getItem('authorization');
  next()
  return false;
  if(!authorization && to.fullPath !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export {
  router,
  setRoutes
}
