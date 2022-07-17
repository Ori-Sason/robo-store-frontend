import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { robotService } from '../services/robot.service'


export const HomePage = () => {

    const [robotImg, setRobotImg] = useState(robotService.getRandomRobotImg())
    const [blinkImgClass, setBlinkImgClass] = useState(false)
    const robotImgIntervalId = useRef()

    useEffect(() => {
        robotImgIntervalId.current = setInterval(() => {
            setBlinkImgClass(false)
            const robotImg = robotService.getRandomRobotImg()
            setRobotImg(robotImg)
        }, 5000)

        return () => {
            clearInterval(robotImgIntervalId.current)
        }
    }, [])

    return <section className="home-page main-layout">
        <section className='hero'>
            <div>
                <h1>Robo Store</h1>
                <h2>The best place to get your robot</h2>
            </div>
            <img className={`robot-img blink-img ${blinkImgClass ? 'visible' : 'invisible'}`}
                onLoad={() => setBlinkImgClass(true)} src={robotImg} alt="robot"
            />
        </section>
        <section className='login'>
            <Link to='/login' className='login'>Login</Link>
            <Link to='/login'>Start Anonymously</Link>
        </section>
    </section>
}