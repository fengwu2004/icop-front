export let module = {
  name:null,
  children:[{
  name:'systemmanager',
  children:[
    {
      name:'role',
      children:[
        {
          name:'main',
          actions:['search', 'create', 'edit', 'reset', 'delete'],
          hidden:true,
        },
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
  {
    name:'messagepush',
    children:[
      {
        name:'area',
        children:[
          {
            name:'main',
            actions:['create', 'delete', 'edit']
          },
          {
            name:'create',
            actions:['create', 'delete', 'edit']
          },
          {
            name:'edit',
            actions:['create', 'delete', 'edit']
          },
        ]
      },
      {
        name:'inner',
        children:[
          {
            name:'main',
            actions:['create', 'delete', 'edit']
          },
          {
            name:'create',
            actions:['create', 'delete', 'edit']
          },
          {
            name:'edit',
            actions:['create', 'delete', 'edit']
          },
        ]
      }
    ]
  }]
}
