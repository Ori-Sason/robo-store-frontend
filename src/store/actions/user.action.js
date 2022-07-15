import { userService } from '../../services/user.service'


export function login(credentials) {
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
            return dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Error on login', err)
            // dispatch(setUserMsg({ type: 'danger', txt: 'Failed login. Please try again later' }))
        }
    }
}

export function singin(credentials) {
    return async dispatch => {
        try {
            const user = await userService.signin(credentials)
            return dispatch({ type: 'SET_USER', user })
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
            return dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('Error on logout', err)
            // dispatch(setUserMsg({ type: 'danger', txt: 'Failed logout. Please try again later' }))
        }
    }
}