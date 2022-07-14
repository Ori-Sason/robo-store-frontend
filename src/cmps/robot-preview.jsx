import { utilService } from '../services/util.service'
import outOfStockImg from '../assets/img/out-of-stock.png'
import defaultRobotImg from '../assets/img/default-robot.png'

export const RobotPreview = ({ robot }) => {
    return <section className="robot-preview">
        <h2 className='name'>{robot.name}</h2>
        <img className='img' src={robot.img} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} />
        <p className='price'>${utilService.numberWithCommas(robot.price)}</p>
        {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
    </section>
}