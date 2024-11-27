运行：pnpm install (下载依赖)，pnpm run dev启动
添加操作测试：运行test.py(提前安装sanic和跨域工具)

目录树
.
├── README.md
├── eslint.config.js
├── filtered_output.txt
├── index.html
├── mock
│   └── user.ts
├── output.txt
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── logo.svg
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── api
│   │   └── user
│   │       ├── index.ts
│   │       └── types.ts
│   ├── assets
│   │   ├── icons
│   │   │   └── heart.svg
│   │   ├── images
│   │   │   ├── IMG_0534.JPG
│   │   │   ├── IMG_0535.JPG
│   │   │   ├── IMG_3669.JPG
│   │   │   ├── background.JPG
│   │   │   ├── background_form.JPG
│   │   │   ├── logo.JPG
│   │   │   ├── test_4.JPG
│   │   │   └── 名片1.ai
│   │   └── vue.svg
│   ├── components
│   │   ├── Pagination
│   │   │   └── index_pagination.vue
│   │   ├── SvgIcon
│   │   │   └── SvgIconIndex.vue
│   │   └── index_components.ts
│   ├── data
│   │   ├── data_node.ts
│   │   └── data_pod.ts
│   ├── layout
│   │   ├── index_layout.vue
│   │   ├── logo
│   │   │   └── index_logo.vue
│   │   ├── main
│   │   │   └── index_main.vue
│   │   ├── menu
│   │   │   └── index_menu.vue
│   │   └── tabbar
│   │       ├── index_tabbar.vue
│   │       ├── left
│   │       │   └── index_left.vue
│   │       └── right
│   │           └── index_right.vue
│   ├── main.ts
│   ├── permisstion.ts
│   ├── router
│   │   ├── index_router.ts
│   │   └── routers.ts
│   ├── store
│   │   ├── index_store.ts
│   │   └── medules
│   │       ├── historyStore_DDQN.ts
│   │       ├── historyStore_kube.ts
│   │       ├── nodeStore.ts
│   │       ├── podStore.ts
│   │       ├── setting.ts
│   │       ├── types
│   │       │   └── types.ts
│   │       └── user.ts
│   ├── styles
│   │   ├── index.scss
│   │   ├── reset.scss
│   │   └── variable.scss
│   ├── utils
│   │   ├── ECharts.vue
│   │   ├── currentTime.ts
│   │   ├── request.ts
│   │   ├── time.ts
│   │   └── token.ts
│   ├── views
│   │   ├── 404
│   │   │   └── index_404.vue
│   │   ├── acl
│   │   │   ├── permission
│   │   │   │   └── index_permission.vue
│   │   │   ├── role
│   │   │   │   └── index_role.vue
│   │   │   └── user
│   │   │       └── index_user.vue
│   │   ├── dispatch
│   │   │   ├── dispatch_show.vue
│   │   │   └── index_dispatch.vue
│   │   ├── home
│   │   │   └── index_home.vue
│   │   ├── login
│   │   │   └── index_login.vue
│   │   ├── product
│   │   │   ├── attr
│   │   │   │   └── index_attr.vue
│   │   │   ├── sku
│   │   │   │   └── index_sku.vue
│   │   │   ├── spu
│   │   │   │   └── index_spu.vue
│   │   │   └── trademark
│   │   │       └── index_trademark.vue
│   │   └── screen
│   │       └── index_screen.vue
│   └── vite-env.d.ts
├── test
│   ├── pod_test1.yaml
│   ├── pod_test2.yaml
│   └── test.py
├── test_pod.py
├── tsconfig.app.json
├── tsconfig.app.tsbuildinfo
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.node.tsbuildinfo
├── typedoc.json
└── vite.config.ts