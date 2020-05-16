const crypto = require('crypto')
const your_sercret_key = 'your_sercret_key'
const encoding = 'utf8'

module.exports = {
  hash: stringifyData => {
    const hmac = crypto.createHmac('sha256', your_sercret_key)
    hmac.update(stringifyData)
    return hmac.digest('hex')
  },
  verifyHash: (hashVal, hashData) => {
    let buffer1 = hashVal
    if(!Buffer.isBuffer(hashVal)) {
      buffer1 = Buffer.from(hashVal, encoding)
    }
    let buffer2 = hashData
    if(!Buffer.isBuffer(hashData)) {
      buffer2 = Buffer.from(hashData, encoding)
    }
    return crypto.timingSafeEqual(buffer1, buffer2)
  },

  signUtf8: async textData => {
    const privateKeyPath = resolve(privateKeyFileName)
    const privateKeyString = readFileSync(privateKeyPath, encoding)
    const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyString)
    const { data: signatureArmored } = await openpgp.sign({
      message: openpgp.message.fromText(textData),  // or .fromText(readableStream: ReadableStream<String>)
      privateKeys: [privateKey]                             // for signing
    })
    return signatureArmored;
  },
  
  verifyUtf8: async signature => {
    const publicKeyPath = resolve(publicKeyFileName)
    const publicKeyString = readFileSync(publicKeyPath, encoding)

    const verified = await openpgp.verify({
        message: await openpgp.message.readArmored(signature),       // parse armored signature
        publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys  // for verification
    });

    await openpgp.stream.readToEnd(verified.data)

    const { valid } = verified.signatures[0];
    if (valid) {
        return true
        console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
    } else {
        throw new Error('signature could not be verified');
    }
  }
}