// *** NPM IMPORTS ***
const express = require('express')
const bodyParser = require('body-parser')

// *** OTHER VARS ***
const app = express()

// *** APP SETTINGS ***
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// *** SERVER LISTENING ***
const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
