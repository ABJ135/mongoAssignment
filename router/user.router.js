const express = require('express')
const router = express.Router()

const controller = require('../controller/user.controller')

router.post('/createUser',controller.createUser)

router.get('/getAllUsers',controller.getAllUsers)

router.get('/getUserById/:id',controller.getUserById)

router.put('/updateUser/:id',controller.updateUser)

router.put('/:Id/borrow/:bookId',controller.borrow)

router.delete('/deleteUser',controller.deleteUser)



module.exports = router