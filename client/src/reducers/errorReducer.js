const errorReducer = (state = null, action)=>{
    switch(action.type){
        case "SET_ERROR":
            return action?.payload
        case "NO_ERROR":
            return null
        default:
            return null
    }
}

export default errorReducer