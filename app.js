// *** NPM IMPORTS ***
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// *** INTERNAL MODULES ***
const indexRoutes = require('./router/index')
const carRoutes = require('./router/cars')
const noFoundRoutes = require('./router/noFound')
// *** OTHER VARS ***
const app = express()

// *** APP SETTINGS ***
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// *** ROUTES ***
// Index routes
app.use('/', indexRoutes)
// Cars routes
app.use('/', carRoutes)
// No found routes
app.use('/', noFoundRoutes)

// *** SERVER LISTENING ***
const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
