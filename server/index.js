import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from'cors'
import userRoutes from './routes/users.js'
import compartmentRoutes from './routes/compartment.js'

const app = express()
dotenv.config() 

app.use(express.json({limit: "30mb", extended:"true"})) 
app.use(express.urlencoded({limit: "30mb", extended:"true"}))
app.use(cors())

app.get('/', (req, res)=>{
    res.send("train ticket booking app")
})

app.use('/user', userRoutes)
app.use('/compartment', compartmentRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)}))
.catch((err)=>console.log(err.message))

