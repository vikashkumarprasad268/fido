const { Fido2Lib } = require("fido2-lib");

let credOptionsForAndroid = new Fido2Lib({
    challengeSize: 128,
    rpId: "showy-eggplant-reason.glitch.me",
    rpName: "dummy server",
    // rpId: "localhost",
    // rpName: "localhost",
    attestation: "none",
    cryptoParams: [-7, -257],
    authenticatorAttachment: "cross-platform",
    authenticatorRequireResidentKey: true,
    authenticatorUserVerification: "required",
    timeout: 600000
})



let credOptionsForWeb = new Fido2Lib({
    challengeSize: 128,
    rpId: "localhost",
    rpName: "dummy server",
    attestation: "none",
    cryptoParams: [-7, -257],
    authenticatorAttachment: "cross-platform",
    authenticatorRequireResidentKey: true,
    authenticatorUserVerification: "required",
    timeout: 600000
})

var attestationExpectationsForWeb = {
    challenge: '',
    origin: 'http://localhost:3000',
    factor: "either"
};

var attestationExpectationsForAndroid = {
    challenge: '',
    //gunjan
    // origin: 'android:apk-key-hash:gxWojOh4vPz-zVgc2a2fjlyXc57ybdGjdPZm_hC2ado',
    //ankur
    // origin:"android:apk-key-hash:iRqNXq3VqoYzAERbmvQPgjDiVxztmBH2I2VS2VCe4g8",
    origin:"",
    rpId: 'showy-eggplant-reason.glitch.me',
    factor: ""
};

var assertionExpectationsForWeb = {
    challenge: '',
    origin: 'http://localhost:3000',
    factor: "either",
    publicKey: '',
    prevCounter: ''
};

var assertionExpectationsForAndroid = {
    challenge: '',
    //gunjan
    // origin: 'android:apk-key-hash:gxWojOh4vPz-zVgc2a2fjlyXc57ybdGjdPZm_hC2ado',
    //ankur
    // origin:"android:apk-key-hash:iRqNXq3VqoYzAERbmvQPgjDiVxztmBH2I2VS2VCe4g8",
    origin:"",
    rpId: 'showy-eggplant-reason.glitch.me',
    factor: "",
    publicKey: '',
    prevCounter: '',
    userHandle: '',
}

module.exports = { credOptionsForAndroid, credOptionsForWeb, attestationExpectationsForWeb, assertionExpectationsForWeb, attestationExpectationsForAndroid, assertionExpectationsForAndroid }

