import { httpService } from './http.service'

const AUTH_BASE_PATH = 'auth/'
const USER_BASE_PATH = 'user/'
const STORAGE_KEY_LOGGIN = 'robots_loggedInUser'

export const userService = {
    getLoggedInUser,
    login,
    signup,
    logout,
    query,
    getById,
    update,
    remove
}

function getLoggedInUser() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGIN))
    return user
}

async function login(credentials, isRemember) {
    try {
        const user = await httpService.post(AUTH_BASE_PATH + 'login', credentials)
        _rememberUserAndSignToSocket(user, isRemember)
        return user
    } catch (err) {
        throw err
    }
}

async function signup(credentials, isRemember) {
    const user = await httpService.post(AUTH_BASE_PATH + 'signup', credentials)
    _rememberUserAndSignToSocket(user, isRemember)
    return user
}

async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGIN)
    /* FIX - socketService */
    return await httpService.post(AUTH_BASE_PATH + 'logout')
}

async function query() {
    const users = await httpService.get(USER_BASE_PATH)
    return users
}

async function getById(userId) {
    const user = await httpService.get(USER_BASE_PATH + userId)
    return user
}

async function update(user, isSetAdmin) {
    try {
        let savedUser
        
        if (isSetAdmin) savedUser = await httpService.put(USER_BASE_PATH + 'admin', user)
        else savedUser = await httpService.put(USER_BASE_PATH, user)
        
        return savedUser
    } catch (err) {
        const { status, data } = err.response
        if (status === 401 || status === 403) throw ({ status, data })
        throw err
    }
}

async function remove(userId) {
    return await httpService.delete(USER_BASE_PATH + userId)
}

function _rememberUserAndSignToSocket(user, isRemember) {
    if (user) {
        /* FIX - socket service */
        if (isRemember) localStorage.setItem(STORAGE_KEY_LOGGIN, JSON.stringify(user))
    }
}
