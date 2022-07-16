import { combineReducers } from 'redux'
import { robotReducer } from './reducers/robot.reducer'
import { userReducer } from './reducers/user.reducer'

export const rootReducer = combineReducers({
    robotModule: robotReducer,
    userModule: userReducer,
})