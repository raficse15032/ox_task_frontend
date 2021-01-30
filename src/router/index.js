import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Registration = () => import('@/views/auth/Register')
const Login = () => import('@/views/auth/Login')
const Product = () => import('@/views/product')


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta:{
        forVisitors:true
      }
    },
    
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        forVisitors:true
      }
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      meta:{
        forVisitors:true
      }
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta:{
        forAuth:true
      }
    }
  ]
})

// Router.beforeEach(
//     (to,from,next) => {
//       if(to.matched.some(record => record.meta.forVisitors)){
//         if(Vue.auth.isAuthenticated())
//           next({
//             path: '/dashboard'
//           })
//         else
//           next()
//       }
        
//       else if(to.matched.some(record => record.meta.forAuth)){
//         if(!Vue.auth.isAuthenticated())
//         next({
//           path: '/login'
//         })
//         else
//           next()
//       }
        
//       else
//         next()  
//     }
//   )
