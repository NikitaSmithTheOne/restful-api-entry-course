const express = require('express')
const HttpStatus = require('http-status-codes')

const router = express.Router()

// *** NOT FOUND ROUTES ***
router.all('*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        data: '404',
    })
})

module.exports = router
