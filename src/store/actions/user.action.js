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