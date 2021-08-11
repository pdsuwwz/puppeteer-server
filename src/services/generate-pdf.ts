import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

import { RequestBody } from '@/controllers/generate-pdf'

const attachmentImage = fs.readFileSync(
  path.resolve(
    process.cwd(),
    'static/google-logo.png'
  ),
  {
    encoding: 'base64'
  }
)

const watermarkImage = fs.readFileSync(
  path.resolve(
    process.cwd(),
    'static/cover-watermark.png'
  ),
  {
    encoding: 'base64'
  }
)
const watermarkImageFull = fs.readFileSync(
  path.resolve(
    process.cwd(),
    'static/cover-watermark-full.png'
  ),
  {
    encoding: 'base64'
  }
)

/**
 * @example

curl --location --request POST 'http://localhost:5000/pdf' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=http://www.google.com' \
--data-urlencode 'cookies[0].name=token' \
--data-urlencode 'cookies[0].value=9s2d4c16-f072-16eg-b134-0642ap190006' \
--data-urlencode 'cookies[0].domain=www.google.com' --output pdf-gen.pdf

 */

export default class GeneratePdfService {
  generate = async (params: RequestBody): Promise<Buffer> => {
    const {
      url,
      cookies = [],
      hasMargin = true,
      attachment = {
        header: 'Page Header',
        footer: 'Page Footer'
      }
    } = params

    const browser = await puppeteer.launch({
      dumpio: true,
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      args: [
        '--disable-extensions',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security'
      ]
    })


    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(100000)

    page.setExtraHTTPHeaders({
      // ...
    })

    await page.setCookie(...cookies)

    await page.goto(encodeURI(url), {
      waitUntil: 'networkidle2'
    })

    // Get the "viewport" of the page, as reported by the page.
    await page.evaluate(async ({ watermarkImage }) => {

      const waitImage = (src: string) => {
        return new Promise((resolve) => {
          const img = document.createElement('img')
          img.onload = () => {
            resolve({})
          }
          img.src = src
        })
      }
      // Watermark Image
      // const src = 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b'
      const src = `data:image/png;base64,${watermarkImage}`

      const image = document.createElement('img')
      image.style.cssText = `
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        opacity: 1;
        user-select: none;
        pointer-events: none;
        z-index: 100000;
      `
      image.src = src
      await waitImage(src)

      document.body.appendChild(image)

      return {

      }
    }, {
      watermarkImage: hasMargin
        ? watermarkImage
        : watermarkImageFull
    })

    // Css for print mode
    page.addStyleTag({
      content: `
        @media print {
          /*
            .xxx-class {
              page-break-before: always;
            }
          */
        }
      `
    })

    const pptrStyleTag = `
      <style>
        .pptr-server-attachment__logo {
          position: relative;
          height: 21px;
          content: url("data:image/png;base64,${attachmentImage}");
        }
      </style>
    `

    const headerTemplate = `
    ${pptrStyleTag}
    <div
    style="
      width: 100%;
      margin: 0 60px;
      color: #222222;
      font-size: 9px;
      font-family: PingFangSC-Regular, PingFang SC;
      border-bottom:1px solid #ddd;
      padding-bottom: 4px;
      backgroud-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    ">
      <div>${attachment.header}</div>
      <div style="display: flex; align-items: center;">
        <span class="pptr-server-attachment__logo"></span>
      </div>
    </div>`

    const footerTemplate = `
    ${pptrStyleTag}
    <div
    style="
      width: 100%;
      margin: 0 60px;
      color: #222222;
      font-size: 9px;
      font-family: PingFangSC-Regular, PingFang SC;
      border-top:1px solid #ddd;
      padding-top: 4px;
      backgroud-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    ">
      <div>${attachment.footer}</div>
      <div style="display: flex; align-items: center;">
        <!-- <span class="pptr-server-attachment__logo"></span>  -->
        <!-- <span>Page number for footer：</span> -->
        <span class="pageNumber"></span>
        <!-- <span> / </span>   -->
        <!-- <span class="totalPages"></span>  -->
      </div>
    </div>`

    const extraProps = {}
    if (hasMargin) {
      extraProps['displayHeaderFooter'] = true
      extraProps['headerTemplate'] = headerTemplate
      extraProps['footerTemplate'] = footerTemplate
      extraProps['margin'] = {
        top: 70,
        left: 81,
        right: 81,
        bottom: 70
      }
    }

    const buffer = await page.pdf({
      format: 'a4',
      printBackground: true,
      ...extraProps
    })
    page.close()
    return buffer
  }
}
