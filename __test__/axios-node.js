const axios = require('axios').default
const fs = require('fs')
const service = axios.create({
  baseURL: 'http://localhost:5000'
})

service({
  method: 'post',
  url: '/combine-pdf',
  responseType: 'arraybuffer',
  data: {
    pdfList: [
      {
        url: 'https://github.com/pdsuwwz',
      },
      {
        url: 'https://vuejs.org/v2/api/',
        hasMargin: false,
        cookies: [
          {
            name: 'token',
            value: 'fc83532c-f833-11eb-8526-0242ac130002',
            domain: 'localhost'
          }
        ]
      }
    ]
  }
}).then((res) => {
  fs.writeFileSync('combime-test1.pdf', res.data)
})
