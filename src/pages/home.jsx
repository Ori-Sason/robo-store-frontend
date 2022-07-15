
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RobotFilter } from '../cmps/robot-filter'
import { RobotList } from '../cmps/robot-list'

import { loadRobots } from '../store/actions/robot.action'

export const Home = () => {

    const robots = useSelector(storeState => storeState.robotModule.robots)
    const [filterBy, setFilterBy] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadRobots(filterBy))
    }, [filterBy])

    const onFilterBy = (filterBy) => {
        dispatch(loadRobots(filterBy))
    }

    return <section className="home-page main-layout">
        <RobotFilter filterBy={filterBy} setFilterBy={setFilterBy} />
        {robots?.length > 0 && <RobotList robots={robots} />}
    </section>
}