import { combineReducers } from 'redux'
import { reviewReducer } from './reducers/review.reducer'
import { robotReducer } from './reducers/robot.reducer'
import { userReducer } from './reducers/user.reducer'

export const rootReducer = combineReducers({
    robotModule: robotReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,
})