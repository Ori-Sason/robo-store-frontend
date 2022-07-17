import { UserPreview } from './user-preview'

export const UserList = ({ users, onToggleAdmin, onDeleteUser }) => {
    return <ul className="user-list">
        {users.map(user => <UserPreview key={user._id} user={user} onToggleAdmin={onToggleAdmin} onDeleteUser={onDeleteUser} />)}
    </ul>
}