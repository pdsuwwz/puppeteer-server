import Koa from 'koa'
import puppeteer from 'puppeteer'

export interface RouterQuery {
  url?: string
}

/**
 * @example http://localhost:3000/pdf?url=https://www.google.com
 */

export default class GeneratePdfService {
  generate = async (ctx: Koa.Context): Promise<unknown> => {
    // https://stackoverflow.com/a/39672914/13202554
    const { url }: RouterQuery = ctx.query

    if (!url) {
      ctx.status = 404
      return {
        status: 'NOT-FOUND'
      }
    }

    const browser = await puppeteer.launch({
      args: [
        '--disable-web-security'
      ]
    })


    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(100000)

    page.setExtraHTTPHeaders({
      // 放置额外的 http header
    })

    await page.goto(encodeURI(url), {
      waitUntil: 'load'
    })


    // Get the "viewport" of the page, as reported by the page.
    await page.evaluate(async () => {

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
      const src = 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b'

      const image = document.createElement('img')
      image.style.cssText = `
        position: fixed;
        width: 90%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        opacity: 0.5;
        user-select: none;
        pointer-events: none;
        z-index: 100000;
      `
      image.src = src
      await waitImage(src)

      document.body.appendChild(image)

      return {

      }
    })

    // Css for print mode
    page.addStyleTag({
      content: `
        @media print {
          #maincontent > div:nth-child(5) {
            page-break-before: always;
          }
        }
      `
    })

    const headerTemplate = `<div
    style="
      width:90%;
      margin:0 auto;
      font-size:12px;
      border-bottom:1px solid #ddd;
      padding:10px 0;
      display: flex;
      justify-content: space-between;
    ">
      <div>Page Header</div>
      <div>
          <span>Page number for header：</span>
          <span class="pageNumber"></span> /
          <span class="totalPages"></span>
        </div>
    </div>`

    const footerTemplate = `<div 
      style="
        width:90%;
        margin:0 auto;
        font-size:12px;
        border-top:1px solid #ddd;
        padding:10px 0;
        display: flex;
        justify-content: space-between;
      ">
        <div style="">Page Footer</div>
        <div>
          <span>Page number for footer：</span>
          <span class="pageNumber"></span> /
          <span class="totalPages"></span>
        </div>
    </div>`



    return await page.pdf({
      format: 'a4',
      displayHeaderFooter: true,
      headerTemplate,
      printBackground: true,
      footerTemplate,
      margin: {
        top: 80,
        bottom: 80
      }
    })
  }
}
