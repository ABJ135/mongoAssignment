const express = require('express')
const router = express.Router()

const controller = require('../controller/book.controller')



router.post('/create',controller.postBook)

router.get('/show',controller.getBook)

router.get('/id/:id',controller.getById)

router.get('/search',controller.search)

module.exports = router