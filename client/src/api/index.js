import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:5000"})

export const createUser = (userData)=>API.post('/user/createuser', userData)
export const logIn = (userData)=>API.post('/user/login',userData)

export const fetchAllUsers = ()=>API.get('/user/getAllUsers')
export const updateProfile = (id, updateData)=>API.patch(`/user/update/${id}`, updateData)
export const deleteUser = (id)=>API.delete(`/user/delete/${id}`)

export const compartmentCreate = (cData)=>API.post('/compartment/create', cData)
export const getAllSeatsDetails = ()=>API.get('/compartment/getAllSeats')
export const updateSeatDetails = (id, seatData)=>API.patch(`/compartment/bookSeat/${id}`, seatData)
