import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import users from '../models/user.js'

export const createUser = async(req, res)=>{
    const {email, password, noOfSeatsAllocated} = req.body

    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            return res.status(404).json({message:"User already Exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await users.create({email, password:hashedPassword, noOfSeatsAllocated})
        res.status(200).json({result: newUser})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const login = async(req, res)=>{

    const {email, password} = req.body;
    try {

        const existingUser = await users.findOne({email})
        if(!existingUser){
            return res.status(404).json({message:"User don't Exist"})
        }
        const isPasswordCrct = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCrct){
            return res.status(404).json( { message: "Invalid Credentials" })
        }

        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, process.env.JWT_SECRET, {expiresIn : '1h'})

        res.status(200).json({result: existingUser, token})

    } catch (error) {
        res.status(500).json("something went wrong")
    }
}