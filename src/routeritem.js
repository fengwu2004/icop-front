let routers = [router, router, router]

let router = {
  
  name:'role',
  title:'角色管理',
  action:['add', 'edit', 'search', 'delete'],
  children:[router, router, router]
}
