import Layout from '@/views/layout/Layout'

const main = { template: '<router-view ref="main"></router-view>' }

const usermain = {
  path: 'main',
  component:_import('systemadmin/user/main'),
  meta: { title: 'usermanagermain'},
  hidden:true
}

const usercreate = {
  path: 'create',
  component: _import('systemadmin/user/create'),
  name: 'usercreate',
  meta: { title: 'usercreate'},
  hidden:true
}

const useredit = {
  path: 'edit',
  component: _import('systemadmin/user/edit'),
  name: 'edituser',
  meta: { title: 'edituser'},
  hidden:true
}

const userrolesetting = {
  path: 'rolesetting',
  component: _import('systemadmin/user/rolesetting'),
  name: 'rolesetting',
  meta: {title: 'rolesetting'},
  hidden: true,
}

const rolemain = {
  path: 'main',
  component:_import('systemadmin/role/main'),
  meta: { title: 'rolemanager', actions:['search', 'create', 'edit', 'reset', 'delete']},
  hidden:true
}

const rolecreate = {
  path: 'create',
  component: _import('systemadmin/role/create'),
  name: 'createrole',
  meta: { title: 'createrole'},
  hidden:true
}

const roleedit = {
  path: 'edit',
  component: _import('systemadmin/role/edit'),
  name: 'editroledetails',
  meta: { title: 'editroledetails'},
  hidden:true
}

const roledetail = {
  
  path: 'details',
  component: _import('systemadmin/role/details'),
  name: 'roledetails',
  meta: { title: 'roledetails'},
  hidden:true
}

const projectmain = {
  
  path: 'main',
  component:_import('systemadmin/project/main'),
  meta: { title: 'projectsetting'},
  hidden:true
}

const user = {
  
  path: 'user',
  redirect: '/systemadmin/user/main',
  name: 'usermanager',
  component:main,
  meta: { title: 'usermanager', icon: 'usermanager' },
  children: [
    {
      path: 'main',
      component:_import('systemadmin/user/main'),
      meta: { title: 'usermanagermain'},
      hidden:true
    },
    {
      path: 'create',
      component: _import('systemadmin/user/create'),
      name: 'usercreate',
      meta: { title: 'usercreate'},
      hidden:true
    },
    {
      path: 'edit',
      component: _import('systemadmin/user/edit'),
      name: 'edituser',
      meta: { title: 'edituser'},
      hidden:true
    },
    {
      path: 'rolesetting',
      component: _import('systemadmin/user/rolesetting'),
      name: 'rolesetting',
      meta: {title: 'rolesetting'},
      hidden: true,
    }
  ]
}

const role = {
  
  path: 'role',
  redirect: '/systemadmin/role/main',
  name: 'rolemanager',
  component:main,
  meta: { title: 'rolemanager', icon: 'rolemanager' },
  children: [
    {
      path: 'main',
      component:_import('systemadmin/role/main'),
      meta: { title: 'rolemanager', actions:['search', 'create', 'edit', 'reset', 'delete']},
      hidden:true
    },
    {
      path: 'create',
      component: _import('systemadmin/role/create'),
      name: 'createrole',
      meta: { title: 'createrole'},
      hidden:true
    },
    {
      path: 'details',
      component: _import('systemadmin/role/details'),
      name: 'roledetails',
      meta: { title: 'roledetails'},
      hidden:true
    },
    {
      path: 'edit',
      component: _import('systemadmin/role/edit'),
      name: 'editroledetails',
      meta: { title: 'editroledetails'},
      hidden:true
    }
  ]
}

const project = {
  
  path: 'project',
  redirect: '/systemadmin/project/main',
  name: 'projectsetting',
  component:main,
  meta: { title: 'projectsetting', icon: 'projectsetting' },
  children: [
    {
      path: 'main',
      component:_import('systemadmin/project/main'),
      meta: { title: 'projectsetting'},
      hidden:true
    }
  ]
}

const systemadmin = {
  path: '/systemadmin',
  component: Layout,
  name: 'systemadmin',
  meta: {title: 'systemadmin', icon: 'systemadmin'},
  children:[systemadmin_role]
}

let systemadmin_role =  {
  path: 'role',
  name: 'systemadmin-role',
  component:main,
  meta: { title: 'systemadmin-role', icon: 'systemadmin-role' },
  children:[systemadmin_role_main]
}

let systemadmin_role_main = {
  path: 'systemadmin-role-main',
  component:_import('systemadmin/role/main'),
  meta: { title: 'systemadmin-role-main', actions:['search', 'create', 'edit', 'reset', 'delete']},
  hidden:true
}

const inner = {
  
  path: 'inner',
  redirect: '/messagepush/inner/main',
  name: 'innerpush',
  component:main,
  meta: { title: 'innerpush', icon: 'innerpush' },
  children: [
    {
      path: 'main',
      component:_import('messagepush/inner/main'),
      meta: { title: 'areapush'},
      hidden:true
    },
    {
      path: 'editor',
      component: _import('messagepush/inner/editor'),
      name: 'innereditormessage',
      meta: { title: 'editormessage'},
      hidden:true
    },
    {
      path: 'create',
      component: _import('messagepush/inner/create'),
      name: 'innercreatemessage',
      meta: {title: 'createareamessage'},
      hidden: true,
    }
  ]
}

const area = {
  
  path: 'area',
  redirect: '/messagepush/area/main',
  name: 'areapush',
  component:main,
  meta: { title: 'areapush', icon: 'areapush' },
  children: [
    {
      path: 'main',
      component:_import('messagepush/area/main'),
      meta: { title: 'areapush'},
      hidden:true
    },
    {
      path: 'editor',
      component: _import('messagepush/area/editor'),
      name: 'editormessage',
      meta: { title: 'editormessage'},
      hidden:true
    },
    {
      path: 'create',
      component: _import('messagepush/area/create'),
      name: 'createareamessage',
      meta: {title: 'createareamessage'},
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
  
let modules = [
  {
    name:'systemmanager',
    children:[
      {
        name:'role',
        actions:['search', 'create', 'edit', 'reset', 'delete'],
        children:[
          {
            name:'create',
            actions:['search', 'create', 'edit', 'reset', 'delete'],
            hidden:true,
          },
          {
            name:'edit',
            actions:['search', 'create', 'edit', 'reset', 'delete'],
            hidden:true,
          },
          {
            name:'detail',
            actions:['search', 'create', 'edit', 'reset', 'delete'],
            hidden:true,
          },
        ]
      },
      {
        name:'user',
        actions:['search', 'create', 'edit', 'reset', 'delete'],
        children:[
          {
            name:'create',
            actions:['search', 'create', 'edit', 'reset', 'delete'],
            hidden:true,
          },
          {
            name:'edit',
            actions:['search', 'create', 'edit', 'reset', 'delete'],
            hidden:true,
          },
          {
            name:'detail',
            actions:['search', 'create', 'edit', 'reset', 'delete'],
            hidden:true,
          },
        ]
      },
      {
        name:'project',
        actions:['search', 'create', 'reset']
      },
    ]
  },
]

function generateRouter(module) {


}

function createRouter(module) {
  
  let route = generateRouter(module.name)
  
  return module.name
}
