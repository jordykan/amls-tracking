import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pages',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
           meta: {
            libre: true
          }
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login'),
          meta: {
            libre: true
          }
        },
        {
          name: 'Pricing',
          path: 'pricing',
          component: () => import('@/views/pages/Pricing')
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register')
        },
      ]
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: {
            root: true,
            cliente:true
          }
        },
        // Pages
        {
          name: 'RTL',
          path: 'pages/rtl',
          component: () => import('@/views/dashboard/pages/Rtl'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile')
        },
        {
          name: 'Timeline',
          path: 'pages/timeline',
          component: () => import('@/views/dashboard/pages/Timeline')
        },

        // Components
        {
          name: 'Buttons',
          path: 'components/buttons',
          component: () => import('@/views/dashboard/component/Buttons')
        },
        {
          name: 'Grid System',
          path: 'components/grid-system',
          component: () => import('@/views/dashboard/component/Grid')
        },
        {
          name: 'Tabs',
          path: 'components/tabs',
          component: () => import('@/views/dashboard/component/Tabs'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
          meta: {
            root: true,
            cliente:true
          }
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons')
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography')
        },
        // Forms
        {
          name: 'Regular Forms',
          path: 'forms/regular',
          component: () => import('@/views/dashboard/forms/RegularForms'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Extended Forms',
          path: 'forms/extended',
          component: () => import('@/views/dashboard/forms/ExtendedForms'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Validation Forms',
          path: 'forms/validation',
          component: () => import('@/views/dashboard/forms/ValidationForms'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Wizard',
          path: 'forms/wizard',
          component: () => import('@/views/dashboard/forms/Wizard'),
            meta: {
            root: true,
            cliente: true
          }
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Extended Tables',
          path: 'tables/extended-tables',
          component: () => import('@/views/dashboard/tables/ExtendedTables'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Data Tabels',
          path: 'tables/data-tables',
          component: () => import('@/views/dashboard/tables/DataTables'),
          meta: {
            root: true,
            cliente: true
          }
        },
        // Maps
        // Root level
        {
          name: 'Widgets',
          path: 'widgets',
          component: () => import('@/views/dashboard/Widgets'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Charts',
          path: 'charts',
          component: () => import('@/views/dashboard/Charts')
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: () => import('@/views/dashboard/Calendar'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'confirmarServicio',
          path: 'confirmarServicio',
          component: () => import('@/views/dashboard/pages/ConfirmarServicio'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'onhire',
          path: 'onhire',
          component: () => import('@/views/dashboard/pages/OnHire'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'ofhire',
          path: 'ofhire',
          component: () => import('@/views/dashboard/pages/OfHire'),
          meta: {
            root: true,
            cliente: true
          }
        },
        {
          name: 'Movimientos',
          path: 'movimientos',
          component: () => import('@/views/dashboard/pages/Movimientos'),
          meta: {
            root: true,
            cliente: true
          }
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.libre)) {
    next()
  } else if (store.state.usuario && store.state.usuario.rol === 'root') {
    if (to.matched.some(record => record.meta.root)) {
      next()
    }
  }else if (store.state.usuario && store.state.usuario.rol === 'Cliente') {
    if (to.matched.some(record => record.meta.cliente)) {
      next()
    }
  } else {
    next({ name: 'Login' })
  }
})

export default router
