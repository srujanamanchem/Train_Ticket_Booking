import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{type: String, required: true},
    password:{type: String, required: true},
    noOfSeatsAllocated:{type: Number, required: true},
    isAdmin:{type: Boolean, default: false},
    image:{type: String},
    dob:{type:String},
    address:{type:String}, 
    mobileNumber:{ type:String},
    createdOn:{type:Date, default: Date.now},
})

export default mongoose.model("User", userSchema)