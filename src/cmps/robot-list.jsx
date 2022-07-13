import { Link } from 'react-router-dom'
import { RoboPreview } from './robot-preview'

export const RoboList = ({ robots }) => {

    return <ul className="robot-list clean-list">
        {robots.map(robot =>
            <li key={robot._id}>
                <Link to={`/robots/${robot._id}`}>
                    <RoboPreview robot={robot} />
                </Link>
            </li>)}
    </ul>
}