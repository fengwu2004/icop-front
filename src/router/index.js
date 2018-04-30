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
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const main = { template: '<router-view ref="main"></router-view>' }

const user = {
  
  path: 'user',
  redirect: '/systemadmin/user/main',
  name: 'usermanager',
  component:main,
  meta: { title: 'usermanager', icon: 'table' },
  children: [
    {
      path: 'main',
      component:_import('systemadmin/user/main'),
      meta: { title: 'usermanagermain', icon: 'table' },
      hidden:true
    },
    {
      path: 'create',
      component: _import('systemadmin/user/create'),
      name: 'usercreate',
      meta: { title: 'usercreate', icon: 'table' },
      hidden:true
    },
    {
      path: 'edit',
      component: _import('systemadmin/user/edit'),
      name: 'edituser',
      meta: { title: 'editcreate', icon: 'table' },
      hidden:true
    },
    {
      path: 'rolesetting',
      component: _import('systemadmin/user/rolesetting'),
      name: 'rolesetting',
      meta: {title: 'rolesetting', icon: 'table'},
      hidden: true,
    }
  ]
}

const role = {
  
  path: 'role',
  redirect: '/systemadmin/role/main',
  name: 'rolemanager',
  component:main,
  meta: { title: 'rolemanager', icon: 'table' },
  children: [
    {
      path: 'main',
      component:_import('systemadmin/role/main'),
      meta: { title: 'rolemanager', icon: 'table' },
      hidden:true
    },
    {
      path: 'create',
      component: _import('systemadmin/role/create'),
      name: 'createrole',
      meta: { title: 'createrole', icon: 'table' },
      hidden:true
    },
    {
      path: 'details',
      component: _import('systemadmin/role/details'),
      name: 'roledetails',
      meta: { title: 'details', icon: 'table' },
      hidden:true
    },
    {
      path: 'edit',
      component: _import('systemadmin/role/edit'),
      name: 'editroledetails',
      meta: { title: 'editroledetails', icon: 'table' },
      hidden:true
    }
  ]
}

const project = {

  path: 'project',
  redirect: '/systemadmin/project/main',
  name: 'projectsetting',
  component:main,
  meta: { title: 'projectsetting', icon: 'table' },
  children: [
    {
      path: 'main',
      component:_import('systemadmin/project/main'),
      meta: { title: 'projectsetting', icon: 'table' },
      hidden:true
    }
  ]
}

const systemadmin = {
  path: '/systemadmin',
  component: Layout,
  redirect: '/systemadmin/user',
  name: 'systemadmin',
  meta: {
    title: 'systemadmin',
    icon: 'table'
  },
  children: [
    role,
    user,
    project
  ]
}

const inner = {
  
  path: 'inner',
  redirect: '/messagepush/inner/main',
  name: 'innerpush',
  component:main,
  meta: { title: 'innerpush', icon: 'table' },
  children: [
    {
      path: 'main',
      component:_import('messagepush/inner/main'),
      meta: { title: 'areapush', icon: 'table' },
      hidden:true
    },
    {
      path: 'editor',
      component: _import('messagepush/inner/editor'),
      name: 'innereditormessage',
      meta: { title: 'editormessage', icon: 'table' },
      hidden:true
    },
    {
      path: 'create',
      component: _import('messagepush/inner/create'),
      name: 'innercreatemessage',
      meta: {title: 'createareamessage', icon: 'table'},
      hidden: true,
    }
  ]
}

const area = {
  
  path: 'area',
  redirect: '/messagepush/area/main',
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
  redirect: '/messagepush/area/main',
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
