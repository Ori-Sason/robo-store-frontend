import { utilService } from '../services/util.service'
import outOfStockImg from '../assets/img/out-of-stock.png'

export const RoboPreview = ({ robot }) => {
    return <li className="robot-preview">
        <h2 className='name'>{robot.name}</h2>
        <img className='img' src={robot.img} alt={robot.name} />
        <p className='price'>${utilService.numberWithCommas(robot.price)}</p>
        {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
    </li>
}