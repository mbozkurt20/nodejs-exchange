const express = require('express')
const router = express.Router()

const operationController = require('../controllers/operationsController')

const authController = require('../controllers/AuthController')
router.post('/register',authController.register)
router.post('/login',authController.loginPost)
router.get('/login',authController.loginGet)
router.get('/users',authController.users)
router.get('/logout',authController.logout)

router.post('/operation-add',operationController.operationPost)



module.exports = router