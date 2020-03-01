const moment = require('moment')
const axios = require('axios')

const { hash } = require('./common')
const { sign, verify } = require('./RSA/rsa')
const crypto = require('crypto')
const assert = require('assert');

let testHash = () => {
  let ts = moment().valueOf(new Date())
  let data = {
    userName: 'thamttn3',
    accountNum: 73983492348,
    ts: ts
  }
  let hashVal = hash(JSON.stringify(data))
  console.log(hashVal)
}

// testHash()

const testHashWithApi = () => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
      userName: 'thamttn3' ,
      accountNum: '73983492348' ,
      ts: ts
  }
  let hashVal = hash(JSON.stringify(data))
  let requestBody = {
      hash: hashVal,
      data: data,
      partnerCode: '0725'
  }
  const UrlApi = 'http://localhost:5500/openapi/info'
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: UrlApi,
    data: requestBody
  })
  .then (respose => respose.data)
  .catch( error => console.log(error))  
}

const testApiGetInfoInvalidParnerCode = () => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
      userName: 'thamttn3' ,
      accountNum: 73983492348 ,
      ts: ts
  }
  let hashVal = hash(JSON.stringify(data))
  let requestBody = {
      hash: hashVal,
      data: data,
      partnerCode: '55555'
  }
  const UrlApi = 'http://localhost:5500/openapi/info'
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: UrlApi,
    data: requestBody
  })
  .then (respose => respose.data)
  .catch( error => console.log(error))
}

const testApiGetInfoTimeoutRequest = () => {
  let ts = moment().valueOf(new Date()) - 35000 // get current milliseconds since the Unix Epoch
  let data = {
      userName: 'thamttn3' ,
      accountNum: 73983492348 ,
      ts: ts
  }
  let hashVal = hash(JSON.stringify(data))
  let requestBody = {
      hash: hashVal,
      data: data,
      partnerCode: '0725'
  }
  const UrlApi = 'http://localhost:5500/openapi/info'
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: UrlApi,
    data: requestBody
  })
  .then (respose => respose.data)
  .catch( error => console.log(error))
}

const testApiGetInfoSuccess = () => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
    //userName: hoangminhthanh2,
      accountNum: '0725922171392',
      ts: ts
  }

  //hoangminhthanh2

  let hashVal = hash(JSON.stringify(data))
  
  let requestBody = {
      hash: hashVal,
      data: data,
      partnerCode: '0725'
  }
  const UrlApi = 'http://localhost:5500/openapi/info'
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: UrlApi,
    data: requestBody
  })
  .then (respose => respose.data)
  .catch( error => console.log(error))
}

const testApiPlusSuccess = () => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
    from:'nguyễn văn a',
    from_account: 231421321,
    to_account: 73983492348,
    amount: 100000, // đơn vị VND
    note: 'ghi chú',
    ts: ts
  }
  let hashVal = hash(JSON.stringify(data))
  let signVal = sign(JSON.stringify(data))
  let requestBody = {
      hash: hashVal,
      signature: signVal,
      data: data,
      partnerCode: '0725'
  }
  const UrlApi = 'http://localhost:5500/openapi/plus'
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: UrlApi,
    data: requestBody
  })
  .then (respose => respose.data)
  .catch( error => console.log(error))
}

const testApiMinusSuccess = () => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
    from:'nguyễn văn a',
    from_account: '231421321',
    to_account: '07251743899648',
    amount: 100000, // đơn vị VND
    note: 'ghi chú',
    ts: ts
  }
  let hashVal = hash(JSON.stringify(data))
  let signVal = sign(JSON.stringify(data))
  let requestBody = {
      hash: hashVal,
      signature: signVal,
      data: data,
      partnerCode: '0725'
  }
  const UrlApi = 'http://localhost:5500/openapi/minus'
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: UrlApi,
    data: requestBody
  })
  .then (respose => respose.data)
  .catch( error => console.log(error))
}



const main = async () => {
  // let ret = await testApiGetInfoInvalidParnerCode()
  // assert.deepEqual(ret, { msg: 'invalid partner code', errorCode: 1000 })
  // // console.log(ret)
  // ret = await testApiGetInfoTimeoutRequest()
  // assert.deepEqual(ret, { msg: 'request timeout', errorCode: 1001 })
  // ret = await testApiGetInfoSuccess()
  // assert.deepEqual(ret, {
  //   msg: 'successfully',
  //   errorCode: 0,
  //   name: 'Hoàng Minh Thanh',
  //   accountNum: '0725922171392',
  //   userName: 'hoangminhthanh2'
  // })
  // let ret = await testApiPlusSuccess()
  let ret = await testApiMinusSuccess()
  console.log(ret)
} 

main()