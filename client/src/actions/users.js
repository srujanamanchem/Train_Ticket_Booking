import * as api from '../api'

export const getAllAgents = ()=>async(dispatch)=>{
    try {
        const {data} = await api.fetchAllUsers()
        dispatch({type:"FETCH_USERS", payload: data})
    } catch (error) {
        dispatch({type:"SET_ERROR", payload: error})
    }
}

export const updateAgentData = (id, updateData)=>async(dispatch)=>{
    try {
        const {data} = await api.updateProfile(id, updateData)
        dispatch({type:"UPDATE_CURRENT_USER", payload: data})
        
    } catch (error) {   
        dispatch({type:"SET_ERROR", payload: error})
    }
}

export const deleteAgent = (id)=>async(dispatch)=>{
    try {
        await api.deleteUser(id)
        dispatch(getAllAgents())
    } catch (error) {
        dispatch({type:"SET_ERROR", payload: error})
    }
}