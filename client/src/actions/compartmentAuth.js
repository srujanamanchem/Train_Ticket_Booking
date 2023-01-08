import * as api from '../api'

export const createCompartment = (cData)=>async(dispatch)=>{
    try {
        const {data} = await api.compartmentCreate(cData)
        dispatch(getAllCompartmentSeats())
    } catch (error) { 
        dispatch({type:"SET_ERROR", payload: error})
    }
}

export const getAllCompartmentSeats = ()=>async(dispatch)=>{
    try {
        const {data} = await api.getAllSeatsDetails()
        dispatch({type: "FETCH_ALL_SEATS", payload:data})
    } catch (error) {
        dispatch({type:"SET_ERROR", payload: error})
    }
}


export const updateSeatData = (id, seatData)=>async(dispatch)=>{
    try {
        const {data} = await api.updateSeatDetails(id, seatData)
        dispatch(getAllCompartmentSeats())
    } catch (error) {
        dispatch({type:"SET_ERROR", payload: error})
    }
}