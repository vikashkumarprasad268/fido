const changeArrayBufferToArray = (arrayBufferObj) => {
    return Array.from(new Uint8Array(arrayBufferObj))
}

async function addUserDetailsToCredential(credentials, userName, userDisplayName ) {
    const registrationOptions = await credentials.attestationOptions()
    registrationOptions.user = {}
    registrationOptions.user.name = userName
    registrationOptions.user.displayName = userDisplayName
    registrationOptions.user.id = Array.from({length: 3}, () => Math.floor(Math.random() * 3));
    challenge = registrationOptions.challenge
    registrationOptions.challenge = changeArrayBufferToArray(registrationOptions.challenge)
    return registrationOptions
}

async function verifyUserCredential(credentials, credentialsToVerify, challenge, attestationExpectations){
    var verifyJson = {}
    verifyJson.response ={}
    verifyJson.rawId = new Uint8Array(credentialsToVerify.rawId).buffer
    verifyJson.response.attestationObject = new Uint8Array(credentialsToVerify.response.attestationObject).buffer
    verifyJson.response.clientDataJSON = new Uint8Array(credentialsToVerify.response.clientDataJSON).buffer

    attestationExpectations.challenge = challenge

    try{
        var regResult = await credentials.attestationResult(verifyJson, attestationExpectations)
        return { isRegistrationSuccessful: true, regResult: regResult}
    }catch(error){
        console.log(error)
        return { isRegistrationSuccessful: false, error: error}
    }
}

module.exports = { addUserDetailsToCredential, verifyUserCredential }