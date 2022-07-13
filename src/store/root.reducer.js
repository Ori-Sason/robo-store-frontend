import { combineReducers } from 'redux'
import { roboReducer } from './reducers/robo.reducer'

export const rootReducer = combineReducers({
    roboModule: roboReducer,
})