import express from "express";
import {createCompartment, getAllSeats, seatBooking} from '../controllers/compartment.js'

const router  = express.Router()

router.post('/create', createCompartment)
router.get('/getAllSeats', getAllSeats)

router.patch('/bookSeat/:id', seatBooking)


export default router;