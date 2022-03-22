const express = require('express')
const router = express.Router()

const portfoyController = require('../controllers/portfolioController')
router.post('/operation',portfoyController.portfoySave)
router.get('/portfoy',portfoyController.portfoyGet)
router.get('/islemler',portfoyController.islemler)
module.exports = router