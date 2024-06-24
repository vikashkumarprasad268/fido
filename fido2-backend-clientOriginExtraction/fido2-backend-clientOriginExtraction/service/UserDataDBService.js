const UserSchema = require('../models/UserMetadataModel')

const insertRegisterDataInDB = async (counter, publicKey, userID) => {
    const userData = {
        counter: counter,
        publicKey: publicKey,
        userID: userID
    }
    let updatedAndInsertedUserDataInDB = await UserSchema.findOneAndUpdate({_id: "1"}, userData)
    return
}

const fetchUserDataFromDB = async () => {
    const fetchedResponseFromDB = await UserSchema.find({_id: '1'})
    const fetchedPublicKeyFromDB = await fetchedResponseFromDB[0].publicKey
    const fetchedCounterFromDB = await fetchedResponseFromDB[0].counter
    const fetchedUserIDFromDB = await fetchedResponseFromDB[0].userID
    // console.log(fetchedUserIDFromDB)a
    return { fetchedPublicKeyFromDB, fetchedCounterFromDB, fetchedUserIDFromDB }
}

module.exports = { insertRegisterDataInDB, fetchUserDataFromDB }