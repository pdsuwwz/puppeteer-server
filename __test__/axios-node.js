const axios = require('axios')
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
        url: 'https://www.google.com/',
        isLandscape: true,
        attachment: {
          header: 'Header 自定义页眉',
          footer: 'Footer 自定义页脚',
        }
      },
      {
        url: 'https://zh-hans.reactjs.org/',
        // hasMargin: false,
        isLandscape: true,
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
