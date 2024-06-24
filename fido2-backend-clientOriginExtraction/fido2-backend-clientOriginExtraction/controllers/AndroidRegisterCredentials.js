const { addUserDetailsToCredential, verifyUserCredential } = require("../service/RegisterCredentialServiceForAndroid")
const { credOptionsForAndroid, attestationExpectationsForAndroid } = require('../models/Credentials.js')
const { insertRegisterDataInDB } = require("../service/UserDataDBService")
const { getOriginFromClientDataJSON } = require("../utils/helper")

const requestGetMakeCredentialOptionsForAndroid = async (req, res) => {
    console.log("requestGetMakeCredentialOptionsForAndroid",req.body)
    const userName = req.body.userName
    
    const userDisplayName = userName
    const registrationOptions = await addUserDetailsToCredential( credOptionsForAndroid, userName, userDisplayName )
    challenge = await registrationOptions.challenge
    userID = registrationOptions.user.id
    return res.send(registrationOptions)
}

const verifyRegisterCredentialsForAndroid = async (req, res) => {
    const credentialsToVerify = req.body
    console.log("verifyRegisterCredentialsForAndroid", credentialsToVerify)
    const origin = getOriginFromClientDataJSON(credentialsToVerify.response.clientDataJSON)
    const verifyUserCredentialResult = await verifyUserCredential(credOptionsForAndroid, credentialsToVerify, challenge, attestationExpectationsForAndroid, origin)

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

module.exports = { requestGetMakeCredentialOptionsForAndroid, verifyRegisterCredentialsForAndroid }