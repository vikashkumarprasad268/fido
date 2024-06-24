const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const { requestGetMakeCredentialOptionsForWeb, verifyRegisterCredentialsForWeb } = require('./controllers/WebRegisterCredentials.js');
const { requestGetAuthenticateCredentialOptionsForWeb, verifyAuthCredentialsForWeb } = require('./controllers/WebAuthenticateCredentials.js');
const { requestGetMakeCredentialOptionsForAndroid, verifyRegisterCredentialsForAndroid } = require('./controllers/AndroidRegisterCredentials.js')
const { requestGetAuthenticateCredentialOptionsForAndroid, verifyAuthCredentialsForAndroid } = require('./controllers/AndroidAuthenticateCredentials.js')

dotenv.config({path: './Creds.env'})

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_DBNAME}.ukm2zte.mongodb.net/passwordlessUserDatabase?retryWrites=true&w=majority`
mongoose.connect(dbURL).then(() => console.log('DB connected')).catch(err => console.log(err))

const app = express()
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret'
}))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cookieParser())

//APIs for Web
app.post('/requestGetMakeCredentialOptionsForWeb', requestGetMakeCredentialOptionsForWeb)
app.post('/verifyRegisterCredentialsForWeb', verifyRegisterCredentialsForWeb)
app.post('/requestGetAuthenticateCredentialOptionsForWeb', requestGetAuthenticateCredentialOptionsForWeb)
app.post('/verifyAuthCredentialsForWeb', verifyAuthCredentialsForWeb)

//APIs for Android
app.post('/requestGetMakeCredentialOptionsForAndroid', requestGetMakeCredentialOptionsForAndroid)
app.post('/verifyRegisterCredentialsForAndroid', verifyRegisterCredentialsForAndroid)
app.post('/requestGetAuthenticateCredentialOptionsForAndroid', requestGetAuthenticateCredentialOptionsForAndroid)
app.post('/verifyAuthCredentialsForAndroid', verifyAuthCredentialsForAndroid)

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})
