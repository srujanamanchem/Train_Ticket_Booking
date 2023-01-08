import mongoose from "mongoose";

const compartmentSchema = mongoose.Schema({
    
    seatNo: {type: Number, required:true},
    isBooked:{type:Boolean, default: false},
    bookedBy: String,
    age: Number, 
    gender: String,

})

export default mongoose.model("Compartment", compartmentSchema)