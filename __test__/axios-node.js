import fs from 'node:fs'
import axios from 'axios'

const PORT = 5000
// const PORT = 8080

const service = axios.create({
  baseURL: `http://localhost:${PORT}`,
})


const init = () => {
  service.post('/combine-pdf', {
    pdfList: [
      {
        url: 'https://www.baidu.com/',
        isLandscape: true,
        attachment: {
          header: 'Header 自定义页眉',
          footer: 'Footer 自定义页脚',
        },
      },
      {
        url: 'https://zh-hans.reactjs.org/',
        // hasMargin: false,
        isLandscape: true,
        cookies: [
          {
            name: 'token',
            value: 'fc83532c-f833-11eb-8526-0242ac130002',
            domain: 'localhost',
          },
        ],
      },
    ],
  }, {
    responseType: 'arraybuffer',
  }).then((res) => {
    fs.writeFileSync('combime-test1.pdf', res.data)
  }).catch((err) => {
    console.log(err)
  })
}

init()
