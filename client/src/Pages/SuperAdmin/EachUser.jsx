import React from 'react'
import {RiDeleteBin5Line} from 'react-icons/ri'


const EachUser = ({agent, deleteAgent}) => {
  return (
    <div className='agent-container'>
      <h5 className='agent-email'>{agent?.email}</h5>
      <h5 className='agent-seats'>{agent?.noOfSeatsAllocated || 0}</h5>
      <h5 className='agent-dob'>{agent?.dob || "DOB*"}</h5>
      <h5 className='agent-address'>{agent?.address || "Address*"}</h5>
      <h5 className='agent-mobile'>{agent?.mobileNumber || "Contact*"}</h5>
      <button className='del-btn' onClick={()=>deleteAgent(agent._id)}><RiDeleteBin5Line /></button>
    </div>
  )
}

export default EachUser
