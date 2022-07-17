import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserList } from '../cmps/user-list'
import { loadUsers, removeUser, updateUser } from '../store/actions/user.action'

export const UserApp = () => {

    const dispatch = useDispatch()
    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    const onToggleAdmin = (userId, isAdmin) => {
        /* FIX - Are you sure modal */
        const user = { _id: userId, isAdmin: !isAdmin }
        dispatch(updateUser(user, true))
    }

    const onDeleteUser = (userId) => {
        /* FIX - Are you sure modal */
        dispatch(removeUser(userId))
    }

    if (!users) return 'Loading...'

    return <section className="user-app main-layout">
        <h2 className='page-header'>Users</h2>
        <UserList users={users} onToggleAdmin={onToggleAdmin} onDeleteUser={onDeleteUser} />
    </section>
}