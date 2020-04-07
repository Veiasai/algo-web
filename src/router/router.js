import App from '../App'

const gray = r => require.ensure([], () => r(require('../page/gray')), 'gray')
const weibull = r => require.ensure([], () => r(require('../page/weibull')), 'weibull')
const solve = r => require.ensure([], () => r(require('../page/solve')), 'solve')
const arma = r => require.ensure([], () => r(require('../page/arma')), 'arma')
const runge = r => require.ensure([], () => r(require('../page/runge')), 'runge')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '/gray',
            component: gray
        },
        {
            path: '/weibull',
            component: weibull
        },
        {
            path: '/solve',
            component: solve
        },
        {
            path: '/arma',
            component: arma
        },
        {
            path: '/runge',
            component: runge
        },
        {
            path: '*'
        }
    ]},
]