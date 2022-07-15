
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageBar } from '../cmps/page-bar'
import { RobotFilter } from '../cmps/robot-filter'
import { RobotList } from '../cmps/robot-list'

import { loadRobots, setFilterBy } from '../store/actions/robot.action'

export const Home = () => {

    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadRobots(filterBy))
    }, [])

    const onSetFilterBy = (currFilterBy) => {
        dispatch(loadRobots(currFilterBy))
    }

    return <section className="home-page main-layout">
        <RobotFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <PageBar filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        {robots?.length > 0 && <RobotList robots={robots} />}
    </section>
}