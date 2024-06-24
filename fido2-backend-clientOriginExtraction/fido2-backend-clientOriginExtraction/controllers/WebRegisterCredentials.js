const { credOptionsForWeb, attestationExpectationsForWeb } = require('../models/Credentials.js')
const { addUserDetailsToCredential, verifyUserCredential } = require('../service/RegisterCredentialServiceForWeb.js')
const { insertRegisterDataInDB, fetchUserDataFromDB } = require('../service/UserDataDBService.js')

var challenge
var userID

const requestGetMakeCredentialOptionsForWeb = async (req, res) => {
    const userName = req.body.userName
    const userDisplayName = req.body.userName
    const registrationOptions = await addUserDetailsToCredential( credOptionsForWeb, userName, userDisplayName )
    challenge = await registrationOptions.challenge
    userID = registrationOptions.user.id
    return res.send(registrationOptions)
}

const verifyRegisterCredentialsForWeb = async (req, res) => {
    const credentialsToVerify = req.body
    const verifyUserCredentialResult = await verifyUserCredential(credOptionsForWeb, credentialsToVerify, challenge, attestationExpectationsForWeb)

    if(verifyUserCredentialResult.isRegistrationSuccessful){
        const publicKey = verifyUserCredentialResult.regResult.authnrData.get("credentialPublicKeyPem")
        const counter = verifyUserCredentialResult.regResult.authnrData.get("counter")
        insertRegisterDataInDB(counter, publicKey, userID)
        res.status(200).end(JSON.stringify({'isRegistrationSuccessful': true}))
    }else{
        console.log("Error: ", verifyUserCredentialResult.error)
        res.status(401).end(JSON.stringify({'isRegistrationSuccessful': false}))
    }
}

module.exports = { requestGetMakeCredentialOptionsForWeb, verifyRegisterCredentialsForWeb }