import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'


const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const User = useSelector(state=>state.currentUserReducer)

    
    useEffect(()=>{
        const token = User?.token
        if(token){
            const decodeToken = decode(token)
            if(decodeToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    }, [dispatch])

    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"})
        navigate('/')
        dispatch(setCurrentUser(null))
    }

  return (
    <div className='nav-bar'>
      <h2>HAPPY BOOKING</h2>
      {User &&<button onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default Navbar
