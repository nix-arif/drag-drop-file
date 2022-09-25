const express = require('express')
const fileControllers = require('./controllers/fileControllers')
const router = express.Router()

router.post('/files/excelFile', fileControllers.processExcelFile)

module.exports = router