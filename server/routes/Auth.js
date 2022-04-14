const express = require('express')
const router = express.Router()
const controller = require('../controllers/AuthController')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post('/login', controller.login)

router.get('/check/token', validateToken, controller.checkToken)

module.exports = router