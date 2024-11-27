

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
                component: () => import('../views/acl/user/index_user.vue'),
                name: 'node_info',
                meta: {
                    title: '节点信息',
                    hidden: false,
                    icon: 'InfoFilled'
                }
            },
            {
                path: '/node/manage',
                component: () => import("../views/acl/role/index_role.vue"),
                name: 'node_manage',
                meta: {
                    title: '节点管理',
                    hidden: false,
                    icon: 'Tools'
                }
            },
            {
                path: '/node/others',
                component: () => import("../views/acl/permission/index_permission.vue"),
                name: 'node_others',
                meta: {
                    title: '其他',
                    hidden: true,
                    icon: 'Grid'
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
                component: () => import("../views/product/trademark/index_trademark.vue"),
                name: 'pod_info',
                meta: {
                    title: 'Pod信息',
                    hidden: false,
                    icon: 'InfoFilled'
                }
            },
            {
                path: '/pod/manage',
                component: () => import("../views/product/attr/index_attr.vue"),
                name: 'pod_manage',
                meta: {
                    title: 'Pod管理',
                    hidden: false,
                    icon: 'Tools'
                }
            },
            {
                path: '/pod/others',
                component: () => import("../views/product/spu/index_spu.vue"),
                name: 'pod_others',
                meta: {
                    title: '其他',
                    hidden: true,
                    icon: 'Grid'
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