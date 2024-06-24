const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_DBNAME}.ukm2zte.mongodb.net/passwordlessUserDatabase?retryWrites=true&w=majority`

const makeDBConnection = () => {
    mongoose.connect(dbURL)
}
module.exports = {makeDBConnection}
