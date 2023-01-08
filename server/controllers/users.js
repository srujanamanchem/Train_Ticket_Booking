import mongoose from "mongoose"
import User from "../models/user.js"

export const getAllUsers = async(req, res)=>{
    try {
        const allUsers = await User.find()
        const allUserDetails = []
        allUsers.forEach((users)=>{
            allUserDetails.push({_id:users._id, email:users.email, isAdmin:users.isAdmin, noOfSeatsAllocated: users.noOfSeatsAllocated, mobileNumber:users?.mobileNumber,
            address: users?.address,  dob:users?.dob})
        })
        res.status(200).json(allUserDetails)
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const updateProfile = async(req, res)=>{
    const {id:_id} = req.params
    const {image, dob, address,mobileNumber} = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("User don't exist...")
    }
    try {
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: {'image':image, 'dob':dob, 'address':address, 'mobileNumber':mobileNumber}}, {new:true})
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message: error.message})
    }
}

export const deleteUser = async(req, res)=>{
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("User unavailable...")
    }
    try {
        await User.findByIdAndRemove(_id)
        res.status(200).json({message:"Successfully deleted..."})
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}