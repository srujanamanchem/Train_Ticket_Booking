import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {updateAgentData} from '../../actions/users'
import './Agent.css'
import { useEffect } from 'react'

const Agent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.currentUserReducer)
    // console.log(currentUser)

    const [agentData, setAgentData] = useState({})
    
    const handleChange = (e)=>{
        
        const { name, value } = e.target
        if(name==="image"){
            const file = e.target.files[0];
            const fileUrl = URL.createObjectURL(file)
            if(file && file.type.substring(0,5)==="image"){
                setAgentData({...agentData, [name]:fileUrl})
            }
        }else{
            setAgentData({...agentData, [name]:value})
        }
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!agentData.image){
            alert("Upload Profile picture")
        }
        if(!agentData.dob){
            alert("Enter Date of Birth")
        }
        if(!agentData.address){
            alert("Enter Address")
        }
        if(!agentData.mobileNumber){
            alert("Enter Mobile Number")
        }else if(agentData?.mobileNumber.length !== 10){
            alert("Enter a valid Mobile Number")
        }
        if(agentData.image && agentData.dob && agentData.address && agentData?.mobileNumber.length === 10){
            dispatch(updateAgentData(currentUser?.result?._id, {image:agentData.image, dob:agentData.dob, address:agentData.address, mobileNumber:agentData.mobileNumber}))
            navigate('/booking')
        }
    }  
    
    useEffect(()=>{
       if(currentUser?.result.dob){
            navigate('/booking')
       }
    }, [currentUser])

  return ( 
    <>
      {currentUser && 
      (
        <div className='agent-details-container'>
            <h1>Agent Details</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='profileImg' className='image-container'>
                <h4>Profile Picture</h4>
                <input 
                type="file" 
                name="image"
                accept='/images/*'
                onChange = {handleChange} id="profileImg"
                />
                {agentData.image && <img src={agentData?.image}  style={{border:"2px solid white", width:"100px", borderRadius:"3px",marginRight:"10px", alignSelf:"flex-end"}} alt="profile-pic"/>}
            </label>
            <label htmlFor='dob'>
                <h4>Date of Birth</h4>
                <input type="date"
                name="dob"
                onChange = {handleChange}
                id="dob"/>
            </label> 
            <label htmlFor='address'>
                <h4>Address</h4>
                <input type="text"
                name="address"
                onChange = {handleChange}
                id="address"/>
            </label>
            <label htmlFor='mobileNumber'>
                <h4>Mobile Number</h4>
                <input type="number"
                name="mobileNumber"
                onChange = {handleChange}
                id="mobileNumber"
                min="0"
                />
            </label>
            <button type="submit">Save</button>
            </form>      
        </div>
        ) 
      }
      { !currentUser && <h1 style={{color:"white", textShadow:"2px 2px 15px white"}}> Please Login...</h1>}
    </>
  )
  
}

export default Agent
