# RSA
Đối với RSA dùng `packet crypto` build-in trong nodejs. Khuyến kích dùng luôn file `rsa.js` đã viết được đặt trong thư mục này. Hoặc có thể tham khảo để viết lại 2 hàm `sign` và `verify`.
# API doccument
1. api dùng để truy xuất thông tin của một account có trong hệ thống.

    Url: `'host:port/openapi/info'` method `POST`. với `host:port` sẽ được config lúc demo. Xem ví dụ về body được gửi kèm api này:

    ```javascript
    const moment = require('moment')
    const { hash } = require('./common') // xem hàm hash trong file `common.js`
    let ts = moment.valueOf() // get current milliseconds since the Unix Epoch
    let data = {
        userName: 'thamttn3' , // chuỗi, userName muốn truy vấn thông tin
        accountNum: 73983492348 , // số tài khoản muốn truy vấn thông tin
        ts: ts
    }

    let hashVal = hash(JSON.stringify(data))

    let requestBody = {
        hash: hashVal,
        data: data,
        partnerCode: '0725'
    }
    ```
## Chuỗi hash được thưc hiện bằng cách Json stringify toàn bộ data gửi đi sau đó hash chuỗi Json stringify này.

    Trong đó `partnerCode` = `0725` là mã code để có thể truy xuất api của nhóm. Néu sai partnerCode sẽ trả về:
    ```javascript
    {
        errorCode: 1000, 
        message: 'invalid partner code',
        data: {
        }
    }
    ```

    `data` là json Object với require feild `ts` và 1 trong 2 feilds `userName` hoặc `accountNum`.
    
    Nếu không có `ts` hoặc 1 trong 2 feild `userName` hoặc `accountNum` response về như sau:
    ```javascript
    {
        errorCode: 1001, 
        message: 'invalid params',
        data: {
        }
    }
    ```
    
    Với `ts` là `current milliseconds` được lấy bằng cách gọi `moment.valueOf()` request sẽ hợp lệ trong vòng `30` giây nếu quá thời hạn `30` response về như sau:
    ```javascript
    {
        errorCode: 1002,
        message: 'request timeout',
        data: {
        }
    }
    ```

    `userName` là `userName` cần truy vấn hoặc `accountNum` là số tài khoản cần truy vấn thông tin. Nếu tìm thấy thông tin api response về như sau:
    ```javascript
    {
        errorCode: 0 , // 0 là không có lỗi
        message: 'successfully',
        data: {
            name: 'Hoàng Minh Thanh',
            accountNum: '0725922171392',
            userName: 'hoangminhthanh2',
            birthDay: '03/22/2002'
        }
    }
    ```
    Nếu không tìm thấy thông tin feild `data` sẽ là object empty `data: {}`

    Với `hashVal` trong feild `hash` đùng để `hash` lại phần `data` để chống `DDos` nếu `hash` không giống `hashVal` được hash lại sẽ trả về : (hàm `verifyHash` được dùng để `verify hash`)

    ```javascript
    {
        errorCode: 1003, 
        message: 'wrong hash'
    }
    ```

2. api dùng để  cộng tiền vào tài khoản có trong hệ thống.
    Url: `'host:port/openapi/plus'` method `POST`

    ```javascript
    const moment = require('moment')
    const { hash } = require('./common') // xem hàm hash trong file `common.js`
    const { sign } = require('./rsa.js') //
    let ts = moment.valueOf() // get current milliseconds since the Unix Epoch
    let data = {
        from:'nguyễn văn a', // tên người gửi, chuỗi
        from_account: '231421321', // số tài khoản người gửi, chuỗi
        to_account: '07251743899648', // số tài khoản người nhận, chuỗi
        amount: 100000, // đơn vị VND, sô big interger
        note: 'ghi chú', // ghi chú, chuỗi
        ts: ts // timestamp lúc request gửi tiền tính bằng minisecond, interger 64 bit
    }

    let hashVal = hash(JSON.stringify(data))
    let signVal = sign(JSON.stringify(data))

    let requestBody = {
        signature: signVal,
        hash: hashVal,
        data: data,
        partnerCode: '0725'
    }
    ```

## Chuỗi hash được thưc hiện bằng cách Json stringify toàn bộ data gửi đi sau đó hash chuỗi Json stringify này.

    Các lỗi `ts`, `hash`, `partnerCode` sẽ tương tự mã lỗi và message như api 1. Ngoài ra nếu sai `signature` sẽ respose lại như sau:
    ```javascript
    {
        errorCode: 1004,
        message: 'wrong signature'
    }
    ```
     Nếu thiếu bất kì `fields` nào trong `data`  response về như sau:
    ```javascript
    {
        errorCode: 1001, 
        message: 'invalid params',
        example: {
            data: {
                from:'nguyễn văn a', 
                from_account: '231421321', 
                to_account: '07251743899648',
                amount: 100000, 
                note: 'ghi chú',
                ts: ts 
            }
        }
    }
    ```
    Nếu thành công sẽ trả lại như sau, nên lưu lại để đối soát.
    ```javascript
    {
        errorCode: 0,
        message: 'successfully',
        signature: signVal,
        hash: hashVal,
        data: {
            tranId: 1831,
            accountNum: 73983492348,
            amount: 100000,
            ts: ts
        }
    }
    ```
3. api dùng để  trừ tiền vào tài khoản có trong hệ thống.
    Url: `'host:port/openapi/minus'` method `POST`

    ```javascript
    const moment = require('moment')
    const { hash } = require('./common') // xem hàm hash trong file `common.js`
    const { sign } = require('./rsa.js') //
    let ts = moment.valueOf() // get current milliseconds since the Unix Epoch
    let data = {
        from:'nguyễn văn a',
        from_account: '231421321',
        to_account: '07251743899648',
        amount: 100000 ,
        note: 'ghi chú',
        ts: ts
    }

    let hashVal = hash(JSON.stringify(data))
    let signVal = sign(JSON.stringify(data))

    let requestBody = {
        signature: signVal,
        hash: hashVal,
        data: data,
        partnerCode: '0725'
    }
    ```

    Các lỗi `ts`, `hash`, `partnerCode` sẽ tương tự mã lỗi và message như api 1. Ngoài ra nếu sai `signature` sẽ respose lại như sau:
    ```javascript
    {
        errorCode: 1004,
        message: 'wrong signature'
    }
    ```
    Nếu thành công sẽ trả lại như sau, nên lưu lại để đối soát.
    ```javascript
    {
        errorCode: 0,
        message: 'successfully',
        signature: signVal,
        hash: hashVal,
        data: {
            tranId: 1831,
            accountNum: 73983492348,
            amount: 100000,
            ts: ts
        }
    }
    ```