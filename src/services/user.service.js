import { httpService } from './http.service'

const BASE_PATH = 'auth/'
const STORAGE_KEY_LOGGIN = 'robots_loggedInUser'

export const userService = {
    login,
    signup,
    logout,
}

async function login(credentials, isRemember) {
    try {
        const user = await httpService.post(BASE_PATH + 'login', credentials)
        _rememberUserAndSignToSocket(user, isRemember)
        return user
    } catch (err) {
        throw err
    }
}

async function signup(credentials, isRemember) {
    const user = await httpService.post(BASE_PATH + 'signup', credentials)
    _rememberUserAndSignToSocket(user, isRemember)
    return user
}

async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGIN)
    /* FIX - socketService */
    return await httpService.post(BASE_PATH + 'signup')
}

function _rememberUserAndSignToSocket(user, isRemember) {
    if (user) {
        /* FIX - socket service */
        if (isRemember) localStorage.setItem(STORAGE_KEY_LOGGIN, JSON.stringify(user))
    }
}