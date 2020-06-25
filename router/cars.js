const express = require('express')
const HttpStatus = require('http-status-codes')
const chalk = require('chalk')
const dotevn = require('dotenv')
const { db } = require('../db')

const router = express.Router()

dotevn.config()

// *** INDEX ***
// List all cars
router.get('/cars', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS INDEX ***'))

    db.cars
        .findAll()
        .then((getData) => {
            if (+process.env.USE_HTML_OUTPUT === 1) {
                // TODO: SPECIFY
                res.status(HttpStatus.OK).render('cars/index', {
                    cars: getData,
                })
            } else {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: getData,
                    method: 'get',
                    route: '/cars',
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

// *** NEW ***
// Show new car form
router.get('/cars/new', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS NEW ***'))

    if (+process.env.USE_HTML_OUTPUT === 1) {
        // TODO: SPECIFY
        res.status(HttpStatus.OK).render('cars/new')
    } else {
        res.status(HttpStatus.OK).json({
            success: true,
            method: 'get',
            route: '/cars/new',
        })
    }
})

// *** CREATE ***
// Create a new car, then redirect somewhere
router.post('/cars', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS CREATE ***'))

    const { name, imageUrl, description } = req.body
    console.log('Name: ', name)
    console.log('Image URL: ', imageUrl)
    console.log('Descritpion: ', description)

    db.cars
        .add(name, imageUrl, description)
        .then((addResponse) => {
            // ok
            if (+process.env.USE_HTML_OUTPUT === 1) {
                // redirect back to a list of cars
                res.status(HttpStatus.OK).redirect('/cars')
            } else {
                // just send back response data
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: addResponse,
                    method: 'post',
                    route: '/cars',
                })
            }
        })
        .catch((error) => {
            // !ok
            console.log(error)
        })
})

// *** SHOW ***
// Show info about one specific dog
router.get('/cars/:id', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS SHOW ***'))
    const { id } = req.params

    db.cars
        .findById(id)
        .then((findResponse) => {
            if (+process.env.USE_HTML_OUTPUT === 1) {
                res.status(HttpStatus.OK).render('cars/show', {
                    car: findResponse,
                })
            } else {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: findResponse,
                    method: 'get',
                    route: '/cars/:id',
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

// *** EDIT ***
// Show edit form for one car
router.get('/cars/:id/edit', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS EDIT ***'))

    const { id } = req.params

    db.cars
        .findById(id)
        .then((findData) => {
            console.log(findData)

            if (+process.env.USE_HTML_OUTPUT === 1) {
                // TODO: SPECIFY
                res.status(HttpStatus.OK).render('cars/edit', { car: findData })
            } else {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: findData,
                    method: 'get',
                    route: '/cars/:id/edit',
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

// *** UPDATE ***
// Update particular car, then redirect somewhere
router.put('/cars/:id', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS UPDATE ***'))

    const { id } = req.params
    const { name, imageUrl, description } = req.body

    console.log('ID: ', id)
    console.log('NEW Name: ', name)
    console.log('NEW Image URL: ', imageUrl)
    console.log('NEW Descritpion: ', description)

    db.cars
        .updateById(id, name, imageUrl, description)
        .then((updateData) => {
            if (+process.env.USE_HTML_OUTPUT === 1) {
                // redirect to a modified car
                res.status(HttpStatus.OK).redirect(`/cars/${id}`)
            } else {
                // just return data
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: updateData,
                    method: 'put',
                    route: '/cars/:id',
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

// *** DESTROY ***
// 	Delete a particular car, then redirect somewhere
router.delete('/cars/:id', (req, res) => {
    console.log(chalk.bgGreen.black('*** CARS DESTROY ***'))

    const { id } = req.params

    db.cars
        .deleteById(id)
        .then((deleteData) => {
            console.log(deleteData)

            if (+process.env.USE_HTML_OUTPUT === 1) {
                // redirect to a list of cars
                res.status(HttpStatus.OK).redirect('/cars')
            } else {
                res.status(HttpStatus.OK).json({
                    success: true,
                    data: deleteData,
                    method: 'delete',
                    route: '/cars/:id',
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router
