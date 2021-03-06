const { writeFileSync, existsSync, unlinkSync, readFileSync } = require('fs')
const crypto = require('crypto')
const {resolve} = require('path')
const SECRET_RSA = 'Your secret key'

const privateKeyFileName = 'private.pem', publicKeyFileName = 'public.pem'
const encoding = 'utf8'
const algorithm = 'SHA256'

const publicKeyOption = {
  type: 'pkcs1',
  format: 'pem',
}

const privateKeyOption = {
  type: 'pkcs1',
  format: 'pem',
  cipher: 'aes-256-cbc',
  passphrase: SECRET_RSA, // protects the private key (key for Encryption private key)
}

function generateKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: publicKeyOption,
    privateKeyEncoding: privateKeyOption,
  })

  console.log('******************************************************\n' +
              '*************Generate RSA Key Pair********************\n' +
              '******************************************************')

  writeFileSync(privateKeyFileName, privateKey)
  writeFileSync(publicKeyFileName, publicKey)
}
// if not exists 'private.pem' in root foder of project. Remove 'public.pem' if exists. Generate KeyPair 'private.pem' 'public.pem'
if (!existsSync(privateKeyFileName)) { 
  try {
    unlinkSync(publicKeyFileName)
  } catch (error) {}
  generateKeyPair()
}

const privateKeyPath = resolve(privateKeyFileName)
// read private key from file
const privateKeyString = readFileSync(privateKeyPath, encoding)
// create KeyObject for private key
const privateKey = crypto.createPrivateKey({...privateKeyOption, key: privateKeyString})

const publicKeyPath = resolve(publicKeyFileName)
const publicKeyString = readFileSync(publicKeyPath, encoding)
const publicKey = crypto.createPublicKey({...publicKeyOption, key: publicKeyString})

module.exports = {
  sign: (data) => {
    let buffer = data
    if(!Buffer.isBuffer(data)) {
      buffer = Buffer.from(data, encoding)
    }
    return crypto.sign(algorithm, buffer, privateKey)
  },
  verify: (data, signature) => {
    let buffer = data
    if(!Buffer.isBuffer(data)) {
      buffer = Buffer.from(data, encoding)
    }
    return crypto.verify(algorithm, buffer, publicKey, signature)
  }
}