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
  }
}