import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const main = { template: '<router-view></router-view>' }

const createuser = {
  path: 'createuser',
  component: _import('systemadmin/usermanager/createuser/index'),
  name: 'createuser',
  meta: { title: 'createuser', icon: 'table' },
  hidden: true
}

const permissionsetting = {
  path: 'permissionsetting',
  component:_import('systemadmin/accountmanager/createaccount/permissionsetting/index'),
  name: 'permissionsetting',
  meta: { title: 'permissionsetting', icon: 'table' },
  hidden: true
}

const createaccount = {
  path: 'createaccount',
  component: _import('systemadmin/accountmanager/createaccount/index'),
  name: 'createaccount',
  meta: { title: 'createaccount', icon: 'table' },
  hidden: true,
}

const usermanager = {
  path: 'usermanager',
  component: _import('systemadmin/usermanager/index'),
  name: 'usermanager',
  meta: { title: 'usermanager', icon: 'table' },
}

const accountmanager = {
  path: 'accountmanager',
  component: _import('systemadmin/accountmanager/index'),
  name: 'accountmanager',
  meta: { title: 'accountmanager', icon: 'table' }}

const projectsetting = {
  path: 'projectsetting',
  // component:_import('systemadmin/projectsetting/index'),
  component: _import('systemadmin/projectsetting/index'),
  name: 'projectsetting',
  meta: { title: 'projectsetting', icon: 'table' }}

const systemadmin = {
  path: '/systemadmin',
  component: Layout,
  redirect: '/systemadmin/usermanager',
  name: 'systemadmin',
  meta: {
    title: 'systemadmin',
    icon: 'table'
  },
  children: [
    usermanager,
    accountmanager,
    projectsetting,
    createuser,
    createaccount,
    permissionsetting
  ]
}

const inner = {
  path: 'inner',
  redirect:'inner/main',
  component: main,
  name: 'innerpush',
  meta: { title: 'innerpush', icon: 'table' },
  children: [
    {
      path: 'main',
      component: _import('messagepush/inner/main'),
      name: 'innerpush',
      meta: { title: 'innerpush', icon: 'table' },
      hidden:true
    },
    {
      path: 'create',
      component: _import('messagepush/inner/create'),
      name: 'createareamessage',
      meta: {title: 'createareamessage', icon: 'table'},
      hidden: true
    },
    {
      path: 'editor',
      component: _import('messagepush/inner/editor'),
      name: 'editormessage',
      meta: { title: 'editormessage', icon: 'table' },
      hidden:true
    }
  ]
}

const area = {
  
  path: 'area',
  redirect: 'area/main',
  name: 'areapush',
  component:main,
  meta: { title: 'areapush', icon: 'table' },
  children: [
    {
      path: 'main',
      component:_import('messagepush/area/main'),
      meta: { title: 'areapush', icon: 'table' },
      hidden:true
    },
    {
      path: 'editor',
      component: _import('messagepush/area/editor'),
      name: 'editormessage',
      meta: { title: 'editormessage', icon: 'table' },
      hidden:true
    },
    {
      path: 'create',
      component: _import('messagepush/area/create'),
      name: 'createareamessage',
      meta: {title: 'createareamessage', icon: 'table'},
      hidden: true,
    }
  ]
}

const messagepush = {
  path: '/messagepush',
  component: Layout,
  redirect: '/messagepush/area',
  name: 'messagepush',
  meta: {
    title: 'messagepush',
    icon: 'table'
  },
  children: [
    area,
    inner,
  ]
}

const error404 = {
  path: '*',
  redirect: '/404',
  hidden: true }

export const asyncRouterMap = [
  messagepush,
  systemadmin,
  error404
]
