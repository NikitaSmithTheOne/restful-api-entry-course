const express = require('express')
const HttpStatus = require('http-status-codes')
const chalk = require('chalk')
const dotevn = require('dotenv')

const router = express.Router()

dotevn.config()

// *** ROOT ROUTE ***
router.get('/', (req, res) => {
    console.log(chalk.bgGreen.black('*** ROOT ***'))

    if (+process.env.USE_HTML_OUTPUT === 1) {
        res.status(HttpStatus.OK).render('index/index')
    } else {
        res.status(HttpStatus.OK).json({
            route: '/',
            success: true,
        })
    }
})

module.exports = router
