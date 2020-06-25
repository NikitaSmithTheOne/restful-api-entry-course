const chalk = require('chalk')
const SQL = require('../sql')

const sql = SQL.cars

const cs = {} // Reusable ColumnSet objects.

// eslint-disable-next-line spaced-comment
//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({
            table: 'cars',
            schema: 'public',
        })

        cs.insert = new pgp.helpers.ColumnSet(['name'], { table })
        cs.update = cs.insert.extend(['?id'])
    }
    return cs
}

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class CarsRepository {
    constructor(db, pgp) {
        this.db = db
        this.pgp = pgp

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp)
    }

    // Adds a new car
    async add(name, imageUrl, description) {
        console.log(chalk.bgYellow.black(' ** SQL - CARS -  ADD CALL ** '))
        console.log(chalk.yellow('Name: ', name))
        console.log(chalk.yellow('Image URL: ', imageUrl))
        console.log(chalk.yellow('Description: ', description))

        return this.db.one(sql.add, [name, imageUrl, description])
    }

    // Update a car by id
    async updateById(id, name, imageUrl, description) {
        console.log(chalk.bgYellow.black(' ** SQL - CARS -  UPDATE CALL ** '))

        console.log(chalk.yellow('Id: ', id))
        console.log(chalk.yellow('Name: ', name))
        console.log(chalk.yellow('Image URL: ', imageUrl))
        console.log(chalk.yellow('Description: ', description))

        return this.db.one(sql.update, [id, name, imageUrl, description])
    }

    // Delete a car by id
    async deleteById(id) {
        console.log(
            chalk.bgYellow.black(' ** SQL - CARS -  DELETE BY ID CALL ** ')
        )

        console.log(chalk.yellow('Id: ', id))

        return this.db.oneOrNone(sql.deleteById, [id])
    }

    // Get all car
    async findAll() {
        console.log(chalk.bgYellow.black(' ** SQL - CARS -  FIND ALL CALL ** '))

        return this.db.any(sql.findAll)
    }

    // Find a car by ID
    async findById(id) {
        console.log(
            chalk.bgYellow.black(' ** SQL - CARS -  FIND BY ID CALL ** ')
        )

        return this.db.oneOrNone(sql.findById, [id])
    }
}

module.exports = CarsRepository
