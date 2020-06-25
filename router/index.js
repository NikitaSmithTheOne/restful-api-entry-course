const express = require('express')
const HttpStatus = require('http-status-codes')
const chalk = require('chalk')

const router = express.Router()

// *** ROOT ROUTE ***
router.get('/', (req, res) => {
    console.log(chalk.bgGreen.black('*** ROOT ***'))
    res.status(HttpStatus.OK).render('index/index')
})

module.exports = router
