import { httpService } from './http.service'

const BASE_PATH = 'auth/'
const STORAGE_KEY_LOGGIN = 'robots_loggedInUser'

export const userService = {
    login,
    signin,
    logout,
}

async function login(credentials) {
    const user = await httpService.post(BASE_PATH + 'login', credentials)
    _rememberUserAndSignToSocket(user)
    return user
}

async function signin(credentials) {
    const user = await httpService.put(BASE_PATH + 'signup', credentials)
    _rememberUserAndSignToSocket(user)
    return user
}

async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGIN)
    /* FIX - socketService */
    return await httpService.post(BASE_PATH + 'signup')
}

function _rememberUserAndSignToSocket(user) {
    if (user) {
        /* FIX - socket service */
        if (user.remember) localStorage.setItem(STORAGE_KEY_LOGGIN, JSON.stringify(user))
    }
}