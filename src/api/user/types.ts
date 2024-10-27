//登录接口需要携带参数ts类型
export interface loginForm {
    username: string,
    password: string,
}

export interface dataType {
    message: string | undefined;
    token?: string,
    data?: dataType,
}
export interface loginResponseData {
    code: number,
    data: dataType,
}
export interface userInfo {
    avatar: string;
    userId: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}
export interface user {
    checkUser: userInfo
}
export interface userResponseData {
    code: number,
    data: userInfo,//从user改为了userInfo
}