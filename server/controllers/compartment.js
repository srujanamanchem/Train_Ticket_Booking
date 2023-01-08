import mongoose from 'mongoose';
import Compartment from "../models/compartment.js";

export const createCompartment = async(req, res)=>{
    const {noOfRows} = req.body
    const newCompartment = []    
    try{
        for (let j=1; j<= noOfRows*6; j++){
            // console.log(j)
            const newSeat = await Compartment.create({seatNo:j})
            newCompartment.push(newSeat)
        }
        res.status(200).json(newCompartment)
    }catch(error){
        res.status(500).json(error)
    }
}

export const getAllSeats = async(req, res)=>{
    try {
        const allSeats = await Compartment.find()
        const allSeatsData = []
        allSeats.forEach((seat)=>{
            allSeatsData.push({_id:seat._id, seatNo:seat.seatNo, isBooked: seat.isBooked, bookedBy:seat?.bookedBy, age: seat?.age, gender: seat?.gender })
        })
        res. status(200).json(allSeatsData)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const seatBooking = async(req, res)=>{
    
    const{id:_id} = req.params
    const { age, gender, agentId} = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Seat not valid...")
    }
    try {
        const updatedSeat = await Compartment.findByIdAndUpdate(_id, {$set: {'isBooked':true, 'age':age, 'gender':gender, 'bookedBy':agentId}}, {new:true}) 
        res.status(200).json(updatedSeat)
        
    } catch (error) {
        res.status(405).json(error)
    }
}