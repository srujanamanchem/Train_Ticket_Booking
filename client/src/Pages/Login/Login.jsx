import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setNoError } from '../../actions/setNoError'
import {login} from '../../actions/auth'
import './Login.css'

const Login = () => {

  const Error =  useSelector(state=>state.errorReducer)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const User = useSelector(state=>state.currentUserReducer)

  useEffect(()=>{
    if(User && !User?.result.dob && !User?.result.isAdmin){
      navigate('/agent-details')
    }else if( User && !User?.result.isAdmin ){
      navigate('/booking')
    }else if(User && User?.result.isAdmin){
      navigate('/super-Admin')
    }
  }, [User])

  useEffect(()=>{
    if(Error!==null){
      alert("Invalid Credentials...") 
      dispatch(setNoError())
    }
  }, [Error, dispatch])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!email){
      alert("Enter Email")
    }
    if(!password){
      alert("Enter Password")
    }
    if(email && password){
      dispatch(login({email, password}, navigate))
    }
  }


  return (
    <div className='login-container'>
      <form onSubmit = {handleSubmit}>
      <label htmlFor="email">
        <h4>Email</h4>
        <input type="email" name="eamil" id="email" placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
      </label>
      <label htmlFor="password">
        <h4>Password</h4>
        <input type="password" name="password" id="password" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
      </label>
      <button type="submit" className='auth-button'>Login</button>
      </form>
    </div>
  )
}

export default Login
