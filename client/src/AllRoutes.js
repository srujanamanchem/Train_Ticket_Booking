import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import SuperAdmin from './Pages/SuperAdmin/SuperAdmin'
import Agent from './Pages/Agent/Agent'
import Booking from './Pages/Booking/Booking'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/super-admin" element={<SuperAdmin/>}/>
      <Route path="/agent-details" element={<Agent/>}/>
      <Route path="/booking" element={<Booking/>}/>
    </Routes>
  )
}

export default AllRoutes
