import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { robotService } from '../services/robot.service'

import defaultRobotImg from '../assets/img/default-robot.png'
import outOfStockImg from '../assets/img/out-of-stock.png'
import { utilService } from '../services/util.service'
import { removeRobot } from '../store/actions/robot.action'
import { QuestionModal } from '../cmps/question-modal'

export const RobotDetails = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const { robots } = useSelector(storeState => storeState.robotModule)
    const [robot, setRobot] = useState(null)
    const [isOpenModalOpen, setIsOpenModalOpen] = useState(false)

    useEffect(() => {
        loadRobot(params.id)
        /* Question - Here I force update when robots change since I move to this page from 'edit'. */
        /* is there a better way? because im creating 2 requests by this way */
    }, [params, robots])

    const loadRobot = async (robotId) => {
        const robot = await robotService.getById(robotId)
        if (!robot) {
            navigate('/robots')
            /* FIX - WE DONT GET TO HERE */
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed loading robot. Check your link please' } }))
        }
        setRobot(robot)
    }

    const onDeleteRobot = (robotId) => {
        dispatch(removeRobot(robotId))
        navigate('/robots')
    }

    if (!robot) return 'Loading'

    return <section className="robot-details main-layout">
        <h2 className='name page-header'>{robot.name}</h2>
        <div className='img-container'>
            <img className='img' src={robot.img || defaultRobotImg} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} />
            {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
        </div>
        <p className='labels'><strong>Labels:</strong> {robot.labels.join(', ')}</p>
        <p className='date'><strong>Creation Date:</strong> {utilService.dateToString(robot.createdAt)}</p>
        <p className='price'><strong>Price:</strong> ${utilService.numberWithCommas(robot.price)}</p>

        {(user && (user.isAdmin || user._id === robot.owner._id)) && <div className='buttons-container'>
            <Link to={`/robots/edit/${robot._id}`}>Edit</Link>
            <button onClick={() => setIsOpenModalOpen(true)}>Delete</button>
        </div>}

        {isOpenModalOpen && <QuestionModal question={'Are you sure you want to delete this robot?'}
            answers={['Cancel', 'Yes']}
            cbFuncs={[() => null, () => onDeleteRobot(robot._id)]}
            setModalFunc={setIsOpenModalOpen}
        />}
    </section>
}