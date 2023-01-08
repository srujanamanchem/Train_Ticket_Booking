import * as api from '../api'
import { setCurrentUser } from './currentUser'
import { getAllAgents } from './users'

export const userCreate = (userData)=>async(dispatch)=>{
    try {
        const {data} = await api.createUser(userData)
        dispatch({type:'AUTH', data})
        dispatch(getAllAgents())
    } catch (error) {
        dispatch({type:"SET_ERROR", payload:error})
    }
}

export const login = (userData, navigate)=>async(dispatch)=>{
    try {
        const {data} = await api.logIn(userData)
        dispatch({type: "LOGIN", data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
        if(data.result.isAdmin){
            navigate('/super-admin')

        }else if(data.result.dob)
        {
            navigate('/booking')
        }
        else{
            navigate('/agent-details')
        }
        
    } catch (error) {
        dispatch({type:"SET_ERROR", payload:error})

    }
}