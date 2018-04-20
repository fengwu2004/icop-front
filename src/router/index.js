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

const rightmenu = null

const createuser = {
  path: 'createuser',
  component:_import('systemadmin/usermanager/createuser/index'),
  // components: {main:_import('systemadmin/usermanager/createuser/index'), rightmenu:rightmenu},
  name: 'createuser',
  meta: { title: 'createuser', icon: 'table' },
  hidden: true
}

const usermanager = {
  path: 'usermanager',
  component:_import('systemadmin/usermanager/index'),
  // components: {main:_import('systemadmin/usermanager/index'), rightmenu:rightmenu},
  name: 'usermanager',
  meta: { title: 'usermanager', icon: 'table' },
  children:[ createuser ]
}

const accountmanager = {
  path: 'accountmanager',
  component:_import('systemadmin/accountmanager/index'),
  // components: {main:_import('systemadmin/accountmanager/index'), rightmenu:rightmenu},
  name: 'accountmanager',
  meta: { title: 'accountmanager', icon: 'table' }}

const projectsetting = {
  path: 'projectsetting',
  component:_import('systemadmin/projectsetting/index'),
  // components: {main:_import('systemadmin/projectsetting/index'), rightmenu:rightmenu},
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
    projectsetting
  ]
}

const innerpush = {
  path: 'innerpush',
  component:_import('messagepush/innerpush/index'),
  // components: {main:_import('messagepush/innerpush/index'), rightmenu:rightmenu},
  name: 'innerpush',
  meta: { title: 'innerpush', icon: 'table' }
}

const areapush = {
  path: 'areapush',
  component:_import('messagepush/areapush/index'),
  // components: {main:_import('messagepush/areapush/index'), rightmenu:rightmenu},
  name: 'areapush',
  meta: { title: 'areapush', icon: 'table' }}

const messagepush = {
  path: '/messagepush',
  component: Layout,
  redirect: '/messagepush/innerpush',
  name: 'messagepush',
  meta: {
    title: 'messagepush',
    icon: 'table'
  },
  children: [
    innerpush,
    areapush
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
