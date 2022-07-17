import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { UserImg } from '../cmps/user-img'
import { userService } from '../services/user.service'

import editImg from '../assets/img/edit-icon.png'
import { loadRobots } from '../store/actions/robot.action'
import { RobotList } from '../cmps/robot-list'
import { PageBar } from '../cmps/page-bar'

export const UserProfile = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async function () {
            const user = await userService.getById(params.id)
            setUser(user)
            if (!user) return
            /* FIX - if no user - use msg and redirect to robots */
            dispatch(loadRobots({ owner: { _id: user._id }, pageIdx: 0, numOfPages: 0 }))
        })()
    }, [params.id])

    const onChangePage = (currFilterBy) => {
        dispatch(loadRobots(currFilterBy))
    }

    if (!user) return 'Loading...'

    return <section className="user-profile main-layout">
        <header>
            <UserImg user={user} />
            <h2 className='page-header'>{user.fullname}</h2>
            {loggedInUser?._id === user._id && <Link to={`/users/edit/${user._id}`}>
                <img className="edit-btn" src={editImg} alt="edit" />
            </Link>}
        </header>
        <section className='robots'>
            <h2 className='sub-header'>Robots</h2>
            {(robots?.length > 0) && <>
                {filterBy.numOfPages > 1 && < PageBar filterBy={filterBy} onSetFilterBy={onChangePage} />}
                <RobotList robots={robots} />
            </>}
            {!robots?.length && <p>The user didn't add robots yet.</p>}
        </section>
        <section className='reviews'>
            <h2 className='sub-header'>Reviews</h2>
            {/* FIX -  */}
            {/* {robots?.length && <>
                {filterBy.numOfPages > 1 && < PageBar filterBy={filterBy} onSetFilterBy={onChangePage} />}
                <RobotList robots={robots} />
            </>} */}
            {/* {!robots?.length && <p>The user didn't add robots yet</p>} */}
            <p>The user didn't write reviews yet.</p>
        </section>
    </section>
}