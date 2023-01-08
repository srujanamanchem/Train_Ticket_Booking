const seatsReducer = (state=null, action)=>{
    switch(action.type){
        case "FETCH_ALL_SEATS":
            return action.payload
        default:
            return state
    }
}

export default seatsReducer