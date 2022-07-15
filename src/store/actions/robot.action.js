import { robotService } from '../../services/robot.service'

export function loadRobots(currFilterBy) {
    return async dispatch => {
        try {
            const { robots, filterBy } = await robotService.query(currFilterBy)
            dispatch({ type: 'SET_ROBOTS', robots })
            dispatch({ type: 'SET_FILTERBY', filterBy })
        } catch (err) {
            console.error('Error:', err)
            /* FIX - add user msg */
        }
    }
}

export function saveRobot(robot) {
    return async dispatch => {
        const actionType = robot._id ? 'UPDATE_ROBOT' : 'ADD_ROBOT'
        try {
            const savedRobot = await robotService.save(robot)
            dispatch({ type: actionType, robot: savedRobot })
            /* FIX - add user msg */
        } catch (err) {
            console.error('Error:', err)
            /* FIX - add user msg */
        }
    }
}

export function removeRobot(robotId) {
    return async dispatch => {
        try {
            await robotService.remove(robotId)
            dispatch({ type: 'REMOVE_ROBOT', robotId })
            /* FIX - add user msg */
        } catch (err) {
            console.error('Error:', err)
            /* FIX - add user msg */
        }
    }
}