
import { useEffect, useState } from 'react'
import { RoboList } from '../cmps/robot-list'
import { roboService } from '../services/robo.service'

export const Home = () => {

    const [robots, setRobots] = useState(null)

    useEffect(() => {
        loadRobots()
    }, [])

    const loadRobots = async () => {
        const robots = await roboService.query()
        setRobots(robots)
    }

    if (!robots) return 'Loading'

    return <section className="home-page main-layout">
        <RoboList robots={robots} />
    </section>
}