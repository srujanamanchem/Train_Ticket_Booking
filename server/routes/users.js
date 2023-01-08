import express from "express";
import {login, createUser} from '../controllers/auth.js'

import {deleteUser, getAllUsers, updateProfile} from '../controllers/users.js'

const router = express.Router()

router.post('/createuser', createUser)
router.post('/login', login)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id',updateProfile)

router.delete('/delete/:id', deleteUser)

export default router