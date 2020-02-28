const moment = require('moment')

const { hash } = require('./common')

let testHash = () => {
  let ts = moment.valueOf()
  let data = {
    userName: 'thamttn3' ,
    accountNum: 73983492348 ,
    ts: ts
  }
  let hashVal = hash(JSON.stringify(data))
  console.log(hashVal)
}

testHash()