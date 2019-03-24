import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

const main = { template: '<router-view ref="main"></router-view>' }

const user = {
  
  path: '/systemadmin/user',
  name: 'systemadmin_user',
  component:main,
  meta: { title: 'systemadmin_user', icon: 'systemadmin_user', code:'122000,122100,122200,122300,122400,122500,122600,122700', activeicon:'systemadmin_user_active' },
  children: [
    {
      path: '/systemadmin/user/main',
      component:_import('systemadmin/user/main'),
      meta: { title: 'systemadmin_user_main', hidden:true },
    },
    {
      path: '/systemadmin/user/edit',
      component: _import('systemadmin/user/edit'),
      name: 'systemadmin_user_edit',
      meta: { title: 'systemadmin_user_edit', hidden:true },
    },
    {
      path: '/systemadmin/user/detail',
      component: _import('systemadmin/user/detail'),
      name: 'systemadmin_user_detail',
      meta: { title: 'systemadmin_user_detail', hidden:true },
    },
    {
      path: '/systemadmin/user/rolesetting',
      component: _import('systemadmin/user/rolesetting'),
      name: 'systemadmin_user_rolesetting',
      meta: {title: 'systemadmin_user_rolesetting', hidden:true },
    }
  ]
}

const role = {
  
  path: '/systemadmin/role',
  name: 'systemadmin_role',
  component:main,
  meta: { title: 'systemadmin_role', icon: 'systemadmin_role', code: '121000,121100,121200,121300,121400,121500', activeicon:'systemadmin_role_active' },
  children: [
    {
      path: '/systemadmin/role/main',
      component:_import('systemadmin/role/main'),
      meta: { title: 'systemadmin_role', hidden:true},
    },
    {
      path: '/systemadmin/role/create',
      component:_import('systemadmin/role/create'),
      name: 'systemadmin_role_create',
      meta: { title: 'systemadmin_role_create', hidden:true},
    },
    {
      path: '/systemadmin/role/edit',
      component: _import('systemadmin/role/edit'),
      name: 'systemadmin_role_edit',
      meta: { title: 'systemadmin_role_edit', hidden:true},
    }
  ]
}

const systemadmin = {
  path: '/systemadmin',
  component: Layout,
  name: 'systemadmin',
  meta: { title: 'systemadmin', code:'120000,123000,123100,123200,123300,121000,121100,121200,121300,121400,121500,122000,122100,122200,122300,122400,122500,122600,122700' },
  children: [
    role,
    user
  ]
}

const inner = {
  
  path: '/messagepush/inner',
  name: 'messagepush_inner',
  component:main,
  meta: { title: 'messagepush_inner', icon: 'innerpush', code:'112000,112100,112200,112300,112400,112500', activeicon:'innerpush_active' },
  children: [
    {
      path: '/messagepush/inner/main',
      component:_import('messagepush/inner/main'),
      meta: { title: 'messagepush_inner', hidden:true},
    },
    {
      path: '/messagepush/inner/edit',
      component: _import('messagepush/inner/editor'),
      name: 'messagepush_inner_edit',
      meta: { title: 'messagepush_inner_edit', hidden:true},
    },
    {
      path: '/messagepush/inner/create',
      component: _import('messagepush/inner/create'),
      name: 'messagepush_inner_create',
      meta: {title: 'messagepush_inner_create', hidden:true},
    },
    {
      path: '/messagepush/inner/repairlist',
      component: _import('messagepush/inner/repairlist'),
      name: 'messagepush_inner_repairlist',
      meta: {title: 'messagepush_inner_repairlist', hidden:true},
    }
  ]
}

const messagepush = {
  path: '/messagepush',
  component: Layout,
  name: 'messagepush',
  meta: { title: 'messagepush', code:'110000,111000,111100,111200,111300,111400,111500,112000,112100,112200,112300,112400,112500' },
  children: [
    inner,
  ]
}

const error404 = {
  path: '*',
  redirect: '/404',
  meta: { hidden:true }
}

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), meta:{hidden: true} },
  { path: '/authredirect', component: _import('login/authredirect'), meta:{hidden: true} },
  { path: '/404', component: _import('errorPage/404'), meta:{hidden: true} },
  { path: '/401', component: _import('errorPage/401'), meta:{hidden: true} },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  messagepush,
  systemadmin,
  error404
]
