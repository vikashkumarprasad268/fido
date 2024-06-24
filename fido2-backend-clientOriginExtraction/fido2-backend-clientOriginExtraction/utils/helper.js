function getOriginFromClientDataJSON(clientDataJSON ) {
    // to decode client data json
    console.log(clientDataJSON)
    const clientDataJSONArrayBuffer = new Uint8Array(clientDataJSON)
    console.log(clientDataJSONArrayBuffer)
    const utf8Decoder = new TextDecoder('utf-8');
    const decodedClientData = JSON.parse(utf8Decoder.decode(clientDataJSONArrayBuffer))
    console.log(decodedClientData)
    return decodedClientData.origin
}

module.exports = { getOriginFromClientDataJSON }