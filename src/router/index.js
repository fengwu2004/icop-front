import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

const main = { template: '<router-view ref="main"></router-view>' }

const repairer = {
  
  path: '/systemadmin/repairer',
  name: 'systemadmin_repairer',
  component:main,
  meta: { title: 'systemadmin_repairer', icon: 'systemadmin_repairer', activeicon:'systemadmin_repairer_active' },
  children: [
    {
      path: '/systemadmin/repairer/main',
      component:_import('systemadmin/repairer/main'),
      meta: { title: 'systemadmin_repairer_main', hidden:true },
    },
    {
      path: '/systemadmin/repairer/edit',
      component: _import('systemadmin/repairer/edit'),
      name: 'systemadmin_repairer_edit',
      meta: { title: 'systemadmin_repairer_edit', hidden:true },
    },
    {
      path: '/systemadmin/repairer/detail',
      component: _import('systemadmin/repairer/detail'),
      name: 'systemadmin_repairer_detail',
      meta: { title: 'systemadmin_repairer_detail', hidden:true },
    },
    {
      path: '/systemadmin/repairer/rolesetting',
      component: _import('systemadmin/repairer/rolesetting'),
      name: 'systemadmin_repairer_rolesetting',
      meta: {title: 'systemadmin_repairer_rolesetting', hidden:true },
    }
  ]
}

const role = {
  
  path: '/systemadmin/role',
  name: 'systemadmin_role',
  component:main,
  meta: { title: 'systemadmin_role', icon: 'systemadmin_role', activeicon:'systemadmin_role_active' },
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
  meta: { title: 'systemadmin' },
  children: [
    role,
    repairer
  ]
}

const equip = {
  
  path: '/assetmanager/equip',
  name: 'assetmanager',
  component:main,
  meta: { title: 'assetmanager', icon: 'equip', activeicon:'equip_active' },
  children: [
    {
      path: '/assetmanager/equip/main',
      component:_import('assetmanager/equip/main'),
      meta: { title: 'assetmanager', hidden:true},
    },
    {
      path: '/assetmanager/equip/edit',
      component: _import('assetmanager/equip/editor'),
      name: 'assetmanager_edit',
      meta: { title: 'assetmanager_edit', hidden:true},
    },
    {
      path: '/assetmanager/equip/create',
      component: _import('assetmanager/equip/create'),
      name: 'assetmanager_create',
      meta: {title: 'assetmanager_create', hidden:true},
    },
    {
      path: '/assetmanager/equip/repairlist',
      component: _import('assetmanager/equip/repairlist'),
      name: 'assetmanager_repairlist',
      meta: {title: 'assetmanager_repairlist', hidden:true},
    },
    {
      path: '/assetmanager/equip/equipdetail',
      component: _import('assetmanager/equip/equipdetail'),
      name: 'assetmanager_equipdetail',
      meta: {title: 'assetmanager_equipdetail', hidden:true},
    },
    {
      path: '/assetmanager/equip/repairdetail',
      component: _import('assetmanager/equip/repairdetail'),
      name: 'assetmanager_repairdetail',
      meta: {title: 'assetmanager_repairdetail', hidden:true},
    }
  ]
}

const assetmanager = {
  path: '/messagepush',
  component: Layout,
  name: 'messagepush',
  meta: { title: 'assetmanager' },
  children: [
    equip,
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
  assetmanager,
  systemadmin,
  error404
]
