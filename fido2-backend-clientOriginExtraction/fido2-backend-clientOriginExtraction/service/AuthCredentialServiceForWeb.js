const { default: base64url } = require("base64url")
const { assertionExpectationsForWeb } = require("../models/Credentials")

const changeArrayBufferToArray = (arrayBufferObj) => {
    return Array.from(new Uint8Array(arrayBufferObj))
}

async function fetchAuthCredentials(credOptionsForWeb){
    const authOptions = await credOptionsForWeb.assertionOptions()
    authOptions.challenge = changeArrayBufferToArray(authOptions.challenge)
    return authOptions
}

function setAssertionExpectations( { fetchedPublicKeyFromDB, fetchedCounterFromDB, fetchedUserIDFromDB } ){
    assertionExpectationsForWeb.publicKey = fetchedPublicKeyFromDB,
    assertionExpectationsForWeb.prevCounter = parseInt(fetchedCounterFromDB)
    assertionExpectationsForWeb.userHandle = base64url(fetchedUserIDFromDB)
    return assertionExpectationsForWeb
}

async function verifyAuthUserCredential( { credOptionsForWeb, credentialsToVerify, assertionExpectations, challenge } ){
    console.log(credentialsToVerify.response.userHandle)
    credentialsToVerify.rawId = new Uint8Array(credentialsToVerify.rawId).buffer
    credentialsToVerify.response.authenticatorData = new Uint8Array(credentialsToVerify.response.authenticatorData).buffer
    credentialsToVerify.response.clientDataJSON = new Uint8Array(credentialsToVerify.response.clientDataJSON).buffer
    credentialsToVerify.response.signature = new Uint8Array(credentialsToVerify.response.signature).buffer
    credentialsToVerify.response.userHandle = new Uint8Array(credentialsToVerify.response.userHandle).buffer
    console.log(credentialsToVerify.response.userHandle)

    assertionExpectations.challenge = challenge
    console.log(assertionExpectations)

    try{
        var authnResult = await credOptionsForWeb.assertionResult(credentialsToVerify, assertionExpectations);
        return { isAuthenticationSuccessful: true, authnResult: authnResult}
    }catch(error){
        console.log(error)
        return { isAuthenticationSuccessful: false, error: error}
    }
}

module.exports = { fetchAuthCredentials, setAssertionExpectations, verifyAuthUserCredential }