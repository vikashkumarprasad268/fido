const { default: base64url } = require("base64url")
const { credOptionsForWeb } = require("../models/Credentials")
const { fetchAuthCredentials, setAssertionExpectations, verifyAuthUserCredential } = require("../service/AuthCredentialServiceForWeb")
const { fetchUserDataFromDB } = require("../service/UserDataDBService")

var challenge

const requestGetAuthenticateCredentialOptionsForWeb = async (req, res) => {
    const authOptionsForWeb = await fetchAuthCredentials(credOptionsForWeb)
    challenge = await authOptionsForWeb.challenge
    res.send(authOptionsForWeb)
}

const verifyAuthCredentialsForWeb = async (req, res) => {
    const credentialsToVerify = req.body

    let { fetchedPublicKeyFromDB, fetchedCounterFromDB, fetchedUserIDFromDB } = await fetchUserDataFromDB()
    // fetchedUserIDFromDB = base64url(fetchedUserIDFromDB)
    const assertionExpectations = setAssertionExpectations( { fetchedPublicKeyFromDB, fetchedCounterFromDB, fetchedUserIDFromDB } )
    console.log(assertionExpectations)
    const verifyAuthUserCredentialResult = await verifyAuthUserCredential( { credOptionsForWeb, credentialsToVerify, assertionExpectations, challenge } )

    if(verifyAuthUserCredentialResult.isAuthenticationSuccessful){
        res.status(200).send(JSON.stringify({'isAuthenticationSuccessful': true}))
    }else{
        console.log("Error: ", verifyUserCredentialResult.error)
        res.status(401).end(JSON.stringify({'isAuthenticationSuccessful': false}))
        res.status(401).send(error)

    }
}

module.exports = { requestGetAuthenticateCredentialOptionsForWeb, verifyAuthCredentialsForWeb }