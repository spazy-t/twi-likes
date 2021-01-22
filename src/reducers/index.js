import { combineReducers } from 'redux'
import favourites from './favourites'
import user from './user'
import userClicked from './userClicked'

export default combineReducers({
    favourites,
    user,
    userClicked
})