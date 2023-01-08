import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import emailjs from '@emailjs/browser'


import { userCreate } from '../../actions/auth'
import { setNoError } from '../../actions/setNoError'
import { deleteAgent } from '../../actions/users'
import { createCompartment } from '../../actions/compartmentAuth'

import EachUser from './EachUser'
import './SuperAdmin.css'

const SuperAdmin = () => {
  const form = useRef()

  const seatsList = useSelector(state=>state.seatsReducer)
  // console.log(seatsList?.length ? true : false)  

  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [noOfSeatsAllocated, setNoOfSeatsAllocated] = useState()
  const [isCreatingAgent, setIsCreatingAgent] = useState(false)
  const [isRowsSpecified, setIsRowsSpecified] = useState(false)
  const [noOfRows, setNoOfRows] = useState()
  
  // console.log(isRowsSpecified)

  const User = useSelector(state=>state.currentUserReducer)
  const Error =  useSelector(state=>state.errorReducer)
  const rawAgentsList = useSelector(state=>state.usersReducer)

  const agentsList = rawAgentsList?.filter(agent=>agent?.isAdmin === false)
  const emailsList = []
  rawAgentsList?.map((each)=>emailsList.push(each.email))
  // console.log(emailsList)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCreateAgentForm = (e)=>{
    e.preventDefault()
    if(!email){
        alert("Specify Email!!")
    }
    if(!password){
        alert("Specify Password!!")
    }
    if(!noOfSeatsAllocated){
        alert("Specify no of Seats!!")
    }

    if(email && password && noOfSeatsAllocated){
      dispatch(userCreate({email, password, noOfSeatsAllocated}))
      setIsCreatingAgent(false)
      if(Error===null && !emailsList.includes(email)){
      emailjs.sendForm('service_dzzmry9', 'template_9st1fyn', form.current, 'Eu0DYRAAfZz--7ivr')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      alert("User Credentials are mailed to Agent")
      }
    }
  }

  const handleDeleteAgent = (id)=>{
      dispatch(deleteAgent(id))
      alert("Agent Deleted...")
  }   

  useEffect(()=>{
    if(Error!==null){
      alert("Error Please check once....") 
      console.log(Error)
      dispatch(setNoError())
    }
    
  }, [Error, dispatch])

  useEffect(()=>{
    if(seatsList?.length){
      setIsRowsSpecified(true)
    }

  }, [seatsList])



  const hadleCompartmentRows = (e)=>{
    e.preventDefault()
    if(!noOfRows){
        alert("Enter No of Rows")
    }else{
        dispatch(createCompartment({noOfRows}))
        setIsRowsSpecified(true)
    }
    
  }

  return (
    <>
    {(User && User?.result.isAdmin) &&
    <div className='super-admin-container'>
      {
        (!isCreatingAgent && !isRowsSpecified) && 
        <>
        <h4>Compartment Rows</h4>
        <form onSubmit={hadleCompartmentRows} className="rows-form"> 
            <label htmlFor='noOfRows' className='rows-input'>
            <input type="number" name="noOfRows" id="noOfRows" min="1" max = "10"
            placeholder='Specify no of rows for compartment' 
            onChange={(e)=>setNoOfRows(e.target.value)}/>
            </label>
            <button type="submit" className='rows-button'> Enter</button>
        </form>
        </>
      }
      {
        (!isCreatingAgent && isRowsSpecified) &&
        <h4>No of Rows Specified is <span style={{color:"red", fontWeight:"700"}}>{seatsList?.length/6} </span></h4>
      }
      <h4>
        Create Agent 
        <span 
        style={{color:"white", 
        marginLeft:"4px", 
        borderRadius:"50%", 
        backgroundColor:"#009dff", 
        padding:"0px 7px 3px 7px" , 
        cursor:"pointer"}}
        onClick={()=>setIsCreatingAgent(!isCreatingAgent)}>
            {isCreatingAgent ? "-" : "+"}
        </span>
      </h4>
       { isCreatingAgent &&
        <form ref={form} onSubmit = {handleCreateAgentForm} >
            <label htmlFor="email">
                <h4>Email</h4>
                <input type="email" name="email" id="email" placeholder='Specify Email' onChange={(e)=>setEmail(e.target.value.toLowerCase())}/>
            </label>
            <label htmlFor="password">
                <h4>Password</h4>
                <input type="password" name="password" id="password" placeholder='Specify Password' onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <label htmlFor="noOfSeatsAllocated">
                <h4>No of Seats </h4>
                <input type="number" 
                name="noOfSeatsAllocated" 
                id="noOfSeatsAllocated" 
                placeholder='Specify No Of Seats' 
                min="1"
                max = "10"
                onChange={(e)=>setNoOfSeatsAllocated(e.target.value)}/>
            </label>
            <button type="submit" className='auth-button'>Create Agent</button>
        </form>
       } 
       {
        !isCreatingAgent && 
         <div className='agents-list-container'>
            <h4>List of Agents:</h4> 
            {
              agentsList?.map((agent)=>(
                <EachUser agent={agent} key={agent._id} deleteAgent={handleDeleteAgent}/>
              ))
            }
         </div>
       }  
      
    </div>
    }
    {
      (User && !User?.result.isAdmin) && <h1 style={{color:"white", textShadow:"2px 2px 15px white"}}> Unauthorized User</h1>
    }
    { !User && <h1 style={{color:"white", textShadow:"2px 2px 15px white"}}> Please Login...</h1>}
    </>
  )
}

export default SuperAdmin
