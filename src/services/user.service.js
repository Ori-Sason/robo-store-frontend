import { httpService } from './http.service'

const AUTH_BASE_PATH = 'auth/'
const USER_BASE_PATH = 'user/'
const STORAGE_KEY_LOGGIN = 'robots_loggedInUser'

export const userService = {
    getLoggedInUser,
    login,
    signup,
    logout,
    getById,
    update,
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

async function getById(userId) {
    const user = await httpService.get(USER_BASE_PATH + userId)
    return user
}

async function update(user) {
    try {
        const savedUser = await httpService.put(USER_BASE_PATH, user)
        return savedUser
    } catch (err) {
        if (err.response.status === 401) {
            throw { status: 401, msg: 'wrong password' }
        }
        throw { status: err.response.status, msg: err.response }
    }
}

function _rememberUserAndSignToSocket(user, isRemember) {
    if (user) {
        /* FIX - socket service */
        if (isRemember) localStorage.setItem(STORAGE_KEY_LOGGIN, JSON.stringify(user))
    }
}
