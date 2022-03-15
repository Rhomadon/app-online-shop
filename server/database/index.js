const mongoose = require('mongoose')
const { dbHost, dbPass, dbName, dbPort, dbUser } = require('../app/config')

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`, () => {
    console.log('Database Running..')
})
const db = mongoose.connection

module.exports = db