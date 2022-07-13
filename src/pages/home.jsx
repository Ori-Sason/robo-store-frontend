
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RobotFilter } from '../cmps/robot-filter'
import { RobotList } from '../cmps/robot-list'

import { loadRobots } from '../store/actions/robot.action'

export const Home = () => {

    const robots = useSelector(storeState => storeState.robotModule.robots)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadRobots())
    }, [])

    if (!robots?.length) return 'Loading'

    return <section className="home-page main-layout">
        <RobotFilter />
        <RobotList robots={robots} />
    </section>
}