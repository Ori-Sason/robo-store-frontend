import { RoboPreview } from './robot-preview'

export const RoboList = ({ robots }) => {

    return <ul className="robot-list clean-list">
        {robots.map(robot => <RoboPreview key={robot._id} robot={robot} />)}
    </ul>
}