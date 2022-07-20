import { useEffect, useState } from 'react'
import { RobotPreview } from '../cmps/robot-preview'
import { robotService } from '../services/robot.service'
import starFullImg from '../assets/img/star-full.png'

export const Dashboard = () => {

    const [statisticData, setStatisticData] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                const statistics = await robotService.getStatistics()
                // console.log('statistics', statistics)
                setStatisticData(statistics)
            } catch (err) {
                /* FIX - user msg */
            }
        })()
    }, [])

    const getStars = (num) => {
        // return '★'.repeat(Math.round(num))
        return '★'.repeat(5)
    }

    if (!statisticData) return 'Loading...'

    return <section className="dashboard main-layout">
        <h2 className='page-header'>Dashboard</h2>

        <section className='dashboard-card'>
            <ul className='clean-list'>
                <li className='total-robots'>
                    <h3>Robots on site</h3>
                    <p className='center-text'>{statisticData.length}</p>
                </li>
                <li>
                    <h3>Most expensive robot</h3>
                    <RobotPreview robot={statisticData.mostExpensive} />
                </li>
                <li>
                    <h3>Least expensive robot</h3>
                    <RobotPreview robot={statisticData.leastExpensive} />
                </li>
                <li className='higher-rate'>
                    <h3>Highest rate robot</h3>
                    <RobotPreview robot={statisticData.highestRate.robot} />
                    <div className='star-rate'>
                        <p>{statisticData.highestRate.avgRate.toFixed(1)}</p>
                        <img src={starFullImg} alt="star-full" />
                    </div>
                </li>
            </ul>
        </section>

        <section className='charts'>
            <ul>
                <li>chart: prices per toy type</li>
                <li>chart: Chart showing the percentage of toys that are in stock by type</li>
            </ul>
        </section>
    </section>
}