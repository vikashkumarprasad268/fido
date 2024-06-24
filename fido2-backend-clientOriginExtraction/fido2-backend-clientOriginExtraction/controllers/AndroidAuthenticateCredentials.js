const { credOptionsForAndroid } = require("../models/Credentials")
const { fetchAuthCredentials, setAssertionExpectations, verifyAuthUserCredential } = require("../service/AuthCredentialServiceForAndroid")
const { fetchUserDataFromDB } = require("../service/UserDataDBService")
const { getOriginFromClientDataJSON } = require("../utils/helper")


const requestGetAuthenticateCredentialOptionsForAndroid = async (req, res) => {
    const authOptionsForAndroid = await fetchAuthCredentials(credOptionsForAndroid)
    challenge = await authOptionsForAndroid.challenge
    res.send(authOptionsForAndroid)
}

const verifyAuthCredentialsForAndroid = async (req, res) => {
    const credentialsToVerify = req.body
    console.log("verifyAuthCredentialsForAndroid", credentialsToVerify)
    const origin = getOriginFromClientDataJSON(credentialsToVerify.response.clientDataJSON)
    let { fetchedPublicKeyFromDB, fetchedCounterFromDB, fetchedUserIDFromDB } = await fetchUserDataFromDB()
    const assertionExpectations = setAssertionExpectations( { fetchedPublicKeyFromDB, fetchedCounterFromDB, fetchedUserIDFromDB, origin } )
    console.log(assertionExpectations)
    const verifyAuthUserCredentialResult = await verifyAuthUserCredential( { credOptionsForAndroid, credentialsToVerify, assertionExpectations, challenge } )

    if(verifyAuthUserCredentialResult.isAuthenticationSuccessful){
        res.status(200).send(JSON.stringify({'isAuthenticationSuccessful': true}))
    }else{
        console.log("Error: ", verifyUserCredentialResult.error)
        res.status(401).end(JSON.stringify({'isAuthenticationSuccessful': false}))
        res.status(401).send(error)

    }
}

module.exports = { requestGetAuthenticateCredentialOptionsForAndroid, verifyAuthCredentialsForAndroid }