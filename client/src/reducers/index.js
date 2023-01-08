import { combineReducers } from "redux";

import authReducer from './auth'
import usersReducer from "./users"
import currentUserReducer from "./currentUser"
import errorReducer  from "./errorReducer"
import seatsReducer from './seatsData'

export default combineReducers({
    authReducer, usersReducer, currentUserReducer, errorReducer, seatsReducer
})