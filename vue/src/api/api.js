import request from "@/network/request";
import {requestTest} from "@/network/requestTest";

//登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/login/doLogin',
        data
    })
}

//退出
export const logout = data => {
    return request({
        method: 'POST',
        url: '/login/doLogout',
        data
    })
}

//页面访问记录
export const logInterview = data => {
    return request({
        method: 'POST',
        url: '/bis-log-interview/add-info',
        data
    })
}

//页面登录记录
export const logLogin = data => {
    return request({
        method: 'POST',
        url: '/bis-log-login/add-info',
        data
    })
}

//系统菜单接口
export const systemMenu = data => {
    return request({
        method: 'GET',
        url: '/menu/get-system-menu',
        params: data
    })
}

//普通菜单接口
export const normalMenu = data => {
    return request({
        method: 'GET',
        url: '/menu/get-normal-menu',
        params: data
    })
}

// 是否允许访问后台
export const allowBackground = data => {
    return request({
        method: 'POST',
        url: '/page/allow-background',
        params: data
    })
}

// 新增用户
export const addUser = data => {
    return request({
        method: 'POST',
        url: '/auth-user/add-user',
        data
    })
}

// 修改用户
export const updateUser = data => {
    return request({
        method: 'POST',
        url: '/auth-user/update-user',
        data
    })
}

// 修改用户密码
export const updatePassword = data => {
    return request({
        method: 'POST',
        url: '/auth-user/update-password',
        data
    })
}

// 删除用户
export const deleteUser = data => {
    return request({
        method: 'POST',
        url: '/auth-user/delete-user',
        params: data
    })
}

// 多条件查询用户
export const selectUser = data => {
    return request({
        method: 'POST',
        url: '/auth-user/select-user',
        data
    })
}

// 获取所有角色信息
export const getRoles = data => {
    return request({
        method: 'GET',
        url: '/auth-role/get-roles',
        params: data
    })
}

// 新增用户角色关系
export const addUserRole = data => {
    return request({
        method: 'POST',
        url: '/auth-role/add-user-role',
        data
    })
}

// 获取所有部门信息
export const getOrg = data => {
    return request({
        method: 'GET',
        url: '/auth-org/get-Org',
        params: data
    })
}

// 新增用户部门关系
export const addUserOrg = data => {
    return request({
        method: 'POST',
        url: '/auth-user/add-org-user',
        data
    })
}

// 查询角色信息
export const selectRole = data => {
    return request({
        method: 'POST',
        url: '/auth-role/select-role',
        data
    })
}

// 新增角色信息
export const addRole = data => {
    return request({
        method: 'POST',
        url: '/auth-role/add-role',
        data
    })
}

// 删除角色信息
export const deleteRole = data => {
    return request({
        method: 'POST',
        url: '/auth-role/delete-role-by-id',
        params: data
    })
}

// 查询部门信息
export const selectOrg = data => {
    return request({
        method: 'POST',
        url: '/auth-org/select',
        data
    })
}

// 新增部门信息
export const addOrg = data => {
    return request({
        method: 'POST',
        url: '/auth-org/add-org',
        data
    })
}

// 删除部门信息
export const deleteOrg = data => {
    return request({
        method: 'POST',
        url: '/auth-org/delete-org-by-id',
        params: data
    })
}

// 查询权限信息
export const selectPermit = data => {
    return request({
        method: 'POST',
        url: '/auth-permit/select',
        data
    })
}

// 新增权限信息
export const addPermit = data => {
    return request({
        method: 'POST',
        url: '/auth-permit/add-permit',
        data
    })
}

// 更新权限信息
export const updatePermit = data => {
    return request({
        method: 'POST',
        url: '/auth-permit/update-permit',
        data
    })
}

// 删除权限信息
export const deletePermit = data => {
    return request({
        method: 'POST',
        url: '/auth-permit/delete-permit',
        params: data
    })
}

export const getLine = data =>{ //获取漫游路线
    return requestTest({
        method:'GET',
        url:'/line-roam/get-line',
        params:data
    })
}