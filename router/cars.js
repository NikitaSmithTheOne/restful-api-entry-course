const express = require('express')
const HttpStatus = require('http-status-codes')
const chalk = require('chalk')

const router = express.Router()

// *** INDEX ***
// List all cars
router.get('/cars', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS INDEX ***'))
    res.status(HttpStatus.OK).render('cars/index')
})

module.exports = router
