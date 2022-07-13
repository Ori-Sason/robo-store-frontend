import { combineReducers } from 'redux'
import { robotReducer } from './reducers/robot.reducer'

export const rootReducer = combineReducers({
    robotModule: robotReducer,
})