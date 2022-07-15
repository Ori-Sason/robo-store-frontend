
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
        <div className='page-bar-container'>
            <PageBar filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link className='add-robot-btn main-btn center-text' to='/robots/edit'>Add new Robot</Link>
        </div>
        {robots?.length > 0 && <RobotList robots={robots} />}
    </section>
}