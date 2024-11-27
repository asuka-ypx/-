
function createUserList() {
    return [
        {
            userId: 1,
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            username: 'system',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'System Token',
        }
    ];
}

export default [
    {
        url: '/api/user/login',
        method: 'post',  // 修正这里
        response: ({ body }) => {
            const { username, password } = body;  // 确保接收了用户名和密码
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password
            );
            if (!checkUser) {
                return { code: 201, data: { message: '账号或密码不正确' } };
            }
            const { token } = checkUser;
            return { code: 200, data: { token } };
        },
    },
    {
        url: '/api/user/info',
        method: 'get',  // 修正这里
        response: (req) => {
            
            const token = req.headers.token;  // 从 req.headers 中获取 token
            const checkUser = createUserList().find(
                (item) => item.token === token
            );
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } };
            }
            return { code: 200, data: checkUser };  // 返回用户信息
        },
    }
];
