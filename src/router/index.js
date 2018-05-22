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

const main = { template: '<router-view ref="main"></router-view>' }

const user = {
  
  path: '/systemadmin/user',
  name: 'systemadmin_user',
  component:main,
  meta: { title: 'systemadmin_user', icon: 'systemadmin_user', code:'122000', activeicon:'systemadmin_user_active' },
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
  meta: { title: 'systemadmin_role', icon: 'systemadmin_role', code: '121000', activeicon:'systemadmin_role_active' },
  children: [
    {
      path: '/systemadmin/role/main',
      component:_import('systemadmin/role/main'),
      meta: { title: 'systemadmin_role', hidden:true},
    },
    {
      path: '/systemadmin/role/edit',
      component: _import('systemadmin/role/edit'),
      name: 'systemadmin_role_edit',
      meta: { title: 'systemadmin_role_edit', hidden:true},
    }
  ]
}

const project = {

  path: '/systemadmin/project',
  name: 'projectsetting',
  component:main,
  meta: { title: 'projectsetting', icon: 'projectsetting', code:'123000', activeicon:'projectsetting_active' },
  children: [
    {
      path: '/systemadmin/project/main',
      component:_import('systemadmin/project/main'),
      meta: { title: 'projectsetting', hidden:true},
    }
  ]
}

const systemadmin = {
  path: '/systemadmin',
  component: Layout,
  name: 'systemadmin',
  meta: { title: 'systemadmin', code:'120000' },
  children: [
    role,
    user,
    project
  ]
}

const inner = {
  
  path: '/messagepush/inner',
  name: 'messagepush_inner',
  component:main,
  meta: { title: 'messagepush_inner', icon: 'innerpush', code:'112000', activeicon:'innerpush_active' },
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
    }
  ]
}

const area = {
  
  path: '/messagepush/area',
  name: 'messagepush_area',
  component:main,
  meta: { title: 'messagepush_area', icon: 'areapush', code:'111000', activeicon:'areapush_active' },
  children: [
    {
      path: '/messagepush/area/main',
      component:_import('messagepush/area/main'),
      meta: { title: 'messagepush_area', hidden:true},
    },
    {
      path: '/messagepush/area/edit',
      component: _import('messagepush/area/editor'),
      name: 'messagepush_area_edit',
      meta: { title: 'messagepush_area_edit', hidden:true},
    },
    {
      path: '/messagepush/area/create',
      component: _import('messagepush/area/create'),
      name: 'messagepush_area_create',
      meta: {title: 'messagepush_area_create', hidden:true},
    }
  ]
}

const messagepush = {
  path: '/messagepush',
  component: Layout,
  name: 'messagepush',
  meta: { title: 'messagepush', code:'110000' },
  children: [
    area,
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
