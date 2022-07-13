import { robotService } from '../../services/robot.service'

export function loadRobots(filterBy) {
    return async dispatch => {
        try {
            const robots = await robotService.query(filterBy)
            dispatch({ type: 'SET_ROBOTS', robots })
        } catch (err) {
            console.error('Error:', err)
            /* FIX - add user msg */
        }
    }
}