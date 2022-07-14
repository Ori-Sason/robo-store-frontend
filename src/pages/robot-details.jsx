import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { robotService } from '../services/robot.service'

import outOfStockImg from '../assets/img/out-of-stock.png'
import { utilService } from '../services/util.service'

export const RobotDetails = () => {

    const params = useParams()
    const [robot, setRobot] = useState(null)

    useEffect(() => {
        loadRobot(params.id)
    }, [params])

    const loadRobot = async (robotId) => {
        const robot = await robotService.getById(robotId)
        setRobot(robot)
    }

    if (!robot) return 'Loading'

    return <section className="robot-details main-layout">
        <h2 className='name'>{robot.name}</h2>
        <div className='img-container'>
            <img className='img' src={robot.img} alt={robot.name} />
            {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
        </div>
        <p className='labels'><strong>Labels:</strong> {robot.labels.join(', ')}</p>
        <p className='date'><strong>Creation Date:</strong> {utilService.dateToString(robot.createdAt)}</p>
        <p className='price'><strong>Price:</strong> ${utilService.numberWithCommas(robot.price)}</p>
    </section>
}