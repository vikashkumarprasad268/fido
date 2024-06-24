const { default: base64url } = require("base64url")
const { assertionExpectationsForAndroid, credOptionsForAndroid } = require("../models/Credentials")

const changeArrayBufferToArray = (arrayBufferObj) => {
    return Array.from(new Uint8Array(arrayBufferObj))
}

async function fetchAuthCredentials(credOptionsForAndroid) {
    const authOptions = await credOptionsForAndroid.assertionOptions()
    authOptions.challenge = changeArrayBufferToArray(authOptions.challenge)
    return authOptions
}

function setAssertionExpectations( { fetchedPublicKeyFromDB, fetchedCounterFromDB, fetchedUserIDFromDB, origin } ){
    assertionExpectationsForAndroid.publicKey = fetchedPublicKeyFromDB,
    assertionExpectationsForAndroid.factor = "either"
    assertionExpectationsForAndroid.prevCounter = parseInt(fetchedCounterFromDB)
    assertionExpectationsForAndroid.userHandle = base64url(fetchedUserIDFromDB)
    assertionExpectationsForAndroid.origin = origin
    return assertionExpectationsForAndroid
}

async function verifyAuthUserCredential( { credOptionsForAndroid, credentialsToVerify, assertionExpectations, challenge } ){
    credentialsToVerify.rawId = new Uint8Array(credentialsToVerify.rawId).buffer
    credentialsToVerify.response.authenticatorData = new Uint8Array(credentialsToVerify.response.authenticatorData).buffer
    credentialsToVerify.response.clientDataJSON = new Uint8Array(credentialsToVerify.response.clientDataJSON).buffer
    credentialsToVerify.response.signature = new Uint8Array(credentialsToVerify.response.signature).buffer
    credentialsToVerify.response.userHandle = new Uint8Array(credentialsToVerify.response.userHandle).buffer
    console.log(credentialsToVerify.response.userHandle)

    assertionExpectations.challenge = challenge

    try{
        var authnResult = await credOptionsForAndroid.assertionResult(credentialsToVerify, assertionExpectations);
        console.log(authnResult)
        return { isAuthenticationSuccessful: true}
    }catch(error){
        console.log(error)
        return { isAuthenticationSuccessful: false}
    }
}

module.exports = { fetchAuthCredentials, setAssertionExpectations, verifyAuthUserCredential }