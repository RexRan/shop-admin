import service from "~/axios.js";

export function login(username, password){
    return service.post('/admin/login', {
        username,
        password
    })
}

export function getInfo() {
    return service.post('/admin/getinfo')
}

export function logout() {
    return service.post('/admin/logout')
}

export function updatepassword(data) {
    return service.post('/admin/updatepassword', data)
}