

export const constantRoute = [
    {
        path: '/login',
        component: () => import('../views/login/index_login.vue'),
        name: 'login',//命名路由
        meta: {
            title: '登录',//菜单标题
            hidden: true,//代表路由标题是否隐藏
            icon: 'Avatar'//菜单左侧图标
        }
    },
    {
        path: '/',
        component: () => import('../layout/index_layout.vue'),
        name: 'layout',//命名路由
        meta: {
            title: '',//菜单标题
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('../views/home/index_home.vue'),
                meta: {
                    title: '首页',//菜单标题
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
            // {
            //     path: '/ceshi',
            //     component: () => import('../views/home/index_home.vue'),
            //     meta:{
            //         title:'测试',//菜单标题
            //         hidden:false,
            //         icon:'Loading'
            //     }
            // }
        ]
    },

    {
        path: '/node',
        component: () => import('../layout/index_layout.vue'),
        name: 'Node',
        meta: {
            title: '节点',
            hidden: false,
            icon: 'Location'
        },
        redirect: '/node/info',
        children: [
            {
                path: '/node/info',
                component: () => import('../views/node/node_info/node_info.vue'),
                name: 'node_info',
                meta: {
                    title: '节点信息',
                    hidden: false,
                    icon: 'InfoFilled'
                }
            },
            {
                path: '/node/manage',
                component: () => import("../views/node/node_manage/node_manage.vue"),
                name: 'node_manage',
                meta: {
                    title: '节点管理',
                    hidden: false,
                    icon: 'Tools'
                }
            },
        ]
    },

    {
        path: '/pod',
        component: () => import('../layout/index_layout.vue'),
        name: 'Pod',
        meta: {
            title: 'Pod',
            hidden: false,
            icon: 'Goods'
        },
        children: [
            {
                path: '/pod/info',
                component: () => import("../views/pod/pod_info/pod_info.vue"),
                name: 'pod_info',
                meta: {
                    title: 'Pod信息',
                    hidden: false,
                    icon: 'InfoFilled'
                }
            },
            {
                path: '/pod/manage',
                component: () => import("../views/pod/pod_manage/pod_manage.vue"),
                name: 'pod_manage',
                meta: {
                    title: 'Pod管理',
                    hidden: false,
                    icon: 'Tools'
                }
            },

        ]
    },
    {
        path: '/dispatch',
        component: () => import('../layout/index_layout.vue'),
        meta: {
            title: '调度管理',
            hidden: false,
            icon: 'Operation'
        },
        redirect:'/dispatch/operation',
        children: [
            {
                path: '/dispatch/operation',
                component: () => import('../views/dispatch/index_dispatch.vue'),
                name: 'Dispatch',
                meta: {
                    title: '调度管理',
                    hidden: false,
                    icon: 'Operation'
                }
            },
            {
                path: '/dispatch/show',
                component: () => import('../views/dispatch/dispatch_show.vue'),
                name: 'Show',
                meta: {
                    title: '调度展示',
                    hidden: false,
                    icon: 'Operation'
                }
            }
        ]
    },


    {
        path: '/404',
        component: () => import('../views/404/index_404.vue'),
        name: '404',//命名路由
        meta: {
            title: '404',//菜单标题
            hidden: true,
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',//重定向到404
        name: 'Any',
        meta: {
            title: 'Any',//菜单标题
            hidden: true,
        }
    }
] 