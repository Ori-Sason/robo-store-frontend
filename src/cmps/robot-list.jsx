import { Link } from 'react-router-dom'
import { RobotPreview } from './robot-preview'

export const RobotList = ({ robots }) => {
    
    return <ul className="robot-list clean-list">
        {robots.map(robot =>
            <li key={robot._id}>
                <Link to={`/robots/${robot._id}`}>
                    <RobotPreview robot={robot} />
                </Link>
            </li>)}
    </ul>
}