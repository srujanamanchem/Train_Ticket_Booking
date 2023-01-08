import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setNoError } from '../../actions/setNoError'
import {updateSeatData} from '../../actions/compartmentAuth'

import './Booking.css'

const Booking = () => {
  const [passengerA, setPassengerA] = useState({})
  const [passengerB, setPassengerB] = useState({})
  // const [passengerC, setPassengerC] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const User = useSelector(state=>state.currentUserReducer)
  const Error = useSelector(state=>state.errorReducer)

  const allSeatsArray = useSelector(state=>state.seatsReducer)
  
  const bookedSeats = allSeatsArray?.filter((each)=>each.isBooked === true)
  
  const windowSeats = allSeatsArray?.filter((each)=>(each.seatNo % 6 === 0 || each.seatNo % 6 === 1) && !each.isBooked)
  const middleSeats = allSeatsArray?.filter((each)=>(each.seatNo % 6 === 2 || each.seatNo % 6 === 5) && !each.isBooked)
  const aisleSeats = allSeatsArray?.filter((each)=>(each.seatNo % 6 === 3 || each.seatNo % 6 === 4) && !each.isBooked)
  
  // console.log(bookedSeats)



  useEffect(()=>{
    setPassengerA({})
    if(!User?.result.dob){
      navigate('/agent-details')
    }
    
  }, [dispatch])

  useEffect(()=>{
    if(Error!==null){
      alert("Seats filled!!...") 
      dispatch(setNoError())
    }
    
  }, [Error, dispatch])



  const handlePassengerA = (e)=>{
    const { name, value } = e.target
    setPassengerA({...passengerA,[name]:value })  
  }
  const handlePassengerB = (e)=>{
    const { name, value } = e.target
    setPassengerB({...passengerB,[name]:value })
  }
  // const handlePassengerC = (e)=>{
  //   const { name, value } = e.target
  //   setPassengerC({...passengerC,[name]:value })
  // }

  const handleBooking = ()=>{
   if(Object.keys(passengerA).length){
    if(passengerA?.age && passengerA?.gender){
      let seatId = ""
      if(passengerA.age >= 60){
         seatId = windowSeats[0]?._id || middleSeats[0]?._id || aisleSeats[0]?.id

      }else if(passengerA.age < 60){
         seatId = middleSeats[0]?._id || aisleSeats[0]?._id
      }
      dispatch(updateSeatData(seatId, {age:passengerA.age, gender:passengerA.gender, agentId:User?.result?._id}))
    }else{
      alert("Refresh the page and Please fill age and gender fields properly... ")
    }
   }

   if(Object.keys(passengerB).length){
    if(passengerB?.age && passengerB?.gender){
      let seatId = ""
      if(passengerB.age >= 60){
         seatId = windowSeats[0]?._id || middleSeats[0]?._id || aisleSeats[0]?.id
      }else if(passengerB.age < 60){
         seatId = middleSeats[0]?._id || aisleSeats[0]?._id
      }
      dispatch(updateSeatData(seatId, {age:passengerB.age, gender:passengerB.gender, agentId:User?.result?._id}))
    }else{
      alert("Refresh the page and Please fill age and gender fields properly... ")
    }
   }

  //  if(Object.keys(passengerC).length){
  //   if(passengerC?.age && passengerC?.gender){
  //     let seatId = ""
  //     if(passengerC.age >= 60){
  //        seatId = windowSeats[0]?._id || middleSeats[0]?._id || aisleSeats[0]?.id
  //     }else if(passengerC.age < 60){
  //        seatId = middleSeats[0]?._id || aisleSeats[0]?._id
  //     }
  //     dispatch(updateSeatData(seatId, {age:passengerC.age, gender:passengerC.gender, agentId:User?.result?._id}))
  //   }else{
  //     alert("Refresh the page and Please fill age and gender fields properly...")
  //   }
  //  }

  }

  
  // const seatsArray=[ 
  //   {seatNo:1, isBooked:false},
  //   {seatNo:2, isBooked: false}, 
  //   {seatNo:3, isBooked: true}, 
  //   {seatNo:4, isBooked: false}, 
  //   {seatNo:5, isBooked: false}, 
  //   {seatNo:6, isBooked: false}, 
  //   {seatNo:7, isBooked: true}, 
  //   {seatNo:8, isBooked: false}, 
  //   {seatNo:9, isBooked: true}, 
  //   {seatNo:10, isBooked: false}, 
  //   {seatNo:11, isBooked: false}, 
  //   {seatNo:12, isBooked: false}, 
  //   {seatNo:13, isBooked: true}, 
  //   {seatNo:14, isBooked: false}, 
  //   {seatNo:15, isBooked: false}, 
  //   {seatNo:16, isBooked: false}, 
  //   {seatNo:17, isBooked: true}, 
  //   {seatNo:18, isBooked: false},
  //   {seatNo:19, isBooked: false}, 
  //   {seatNo:20, isBooked: false}, 
  //   {seatNo:21, isBooked: false}, 
  //   {seatNo:22, isBooked: true}, 
  //   {seatNo:23, isBooked: false}, 
  //   {seatNo:24, isBooked: false},
  //   {seatNo:25, isBooked: true}, 
  //   {seatNo:26, isBooked: false}, 
  //   {seatNo:27, isBooked: false}, 
  //   {seatNo:28, isBooked: false}, 
  //   {seatNo:29, isBooked: false}, 
  //   {seatNo:30, isBooked: false},
  // ]


  return (
    <>
    {User &&
    <div className='booking-container'>
      <div  className='seat-booking-form'>
        <h4>Booking Form</h4>
        <form onChange={handlePassengerA}
        className='passenger-entry'>
          <div className='form-input'>
              <p>Age</p>
              <input type="number" name="age" min="1" max="80" placeholder='Enter Age' />
          </div>
        <div className='form-input'>
          <p>Gender</p>
          <select name="gender" >
            <option></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        </form>
        <form onChange={handlePassengerB}
        className='passenger-entry'>
          <div className='form-input'>
              <p>Age</p>
              <input type="number"  name="age" min="1" max="80" placeholder='Enter Age' />
          </div>
        <div className='form-input'>
          <p>Gender</p>
          <select name="gender" >
            <option></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        </form>
        {/* <form onChange={handlePassengerC}
        className='passenger-entry'>
          <div className='form-input'>
              <p>Age</p>
              <input type="number"  name="age" min="1" max="80" placeholder='Enter Age'/>
          </div>
        <div className='form-input'>
          <p>Gender</p>
          <select name="gender" >
            <option></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        </form> */}
        <button onClick={handleBooking} className="book-button">Book Ticket</button>
      </div>
      <div className='seats-container'>
        {allSeatsArray?.map((each)=>(
          <div key={each.seatNo} className={each.isBooked ? "seat booked" : "seat"}>
              <p>{each.seatNo}</p>
              </div>
        ))}
      </div>
    </div>
    }
    {!User && <h1 style={{color:"white", textShadow:"2px 2px 15px white"}}> Please Login...</h1>}
    </>
  )
}

export default Booking
