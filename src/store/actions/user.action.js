import { userService } from '../../services/user.service'


export function login(credentials, isMakeHttpRequest = true, isRemember = false) {
    return async dispatch => {
        let user
        try {
            // we make this option since in the login page we refer directly to the service
            // in order to show error msg if the user entered wrong credentials
            if (isMakeHttpRequest) user = await userService.login(credentials, isRemember)
            else user = credentials

            dispatch({ type: 'SET_USER', user })

            return user
        } catch (err) {
            console.log('Error on login', err)
            // dispatch(setUserMsg({ type: 'danger', txt: 'Failed login. Please try again later' }))
        }
    }
}

export function signup(credentials, isMakeHttpRequest = true, isRemember = false) {
    return async dispatch => {
        let user
        try {
            if (isMakeHttpRequest) user = await userService.signup(credentials, isRemember)
            else user = credentials

            dispatch({ type: 'SET_USER', user })
            return user
        } catch (err) {
            console.log('Error on sing in', err)
            // dispatch(setUserMsg({ type: 'danger', txt: 'Failed sign in. Please try again later' }))
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            await userService.logout()
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('Error on logout', err)
            // dispatch(setUserMsg({ type: 'danger', txt: 'Failed logout. Please try again later' }))
        }
    }
}

export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.query()
            dispatch({ type: 'SET_USERS', users: users })
        } catch (err) {
            console.error('Error on loading users', err)
            /* FIX - add user msg */
        }
    }
}

export function updateUser(user, isMakeHttpRequest = true, isSetAdmin = false) {
    return async dispatch => {
        try {
            let savedUser = user
            if (isMakeHttpRequest) savedUser = await userService.update(user, isSetAdmin)

            if (isSetAdmin) dispatch({ type: 'UPDATE_USER_ADMIN', user: savedUser }) //user_admin returns only mini-user
            else dispatch({ type: 'UPDATE_USER', user: savedUser })
            /* FIX - add user msg */
        } catch (err) {
            console.error('Error on updating user', err)
            /* FIX - add user msg */
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
            /* FIX - add user msg */
        } catch (err) {
            console.error('Error on loading users', err)
            /* FIX - add user msg */
        }
    }
}