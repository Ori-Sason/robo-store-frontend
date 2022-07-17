import { UserImg } from './user-img'
import adminImg from '../assets/img/admin.png'
import { Link } from 'react-router-dom'

export const UserPreview = ({ user, onToggleAdmin, onDeleteUser }) => {
    return <li className="user-preview">
        <section className='details'>
            <UserImg user={user} />
            {user.isAdmin && <img className="admin-img" src={adminImg} alt="admin" />}
            <p>{user.fullname}</p>
        </section>
        <section className='buttons'>
            <Link className='sub-btn' to={`/users/${user._id}`}>Details</Link>
            <Link className='sub-btn' to={`/users/edit/${user._id}`}>Edit</Link>
            <button className='sub-btn' onClick={() => onToggleAdmin(user._id, user.isAdmin)}>{user.isAdmin ? 'Remove admin' : 'Set admin'}</button>
            <button className='sub-btn' onClick={() => onDeleteUser(user._id)}>Delete</button>
        </section>
    </li>
}