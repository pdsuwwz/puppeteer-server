import Koa from 'koa'
import puppeteer from 'puppeteer'

export interface RouterQuery {
  url?: string
}


/**
 * @example http://localhost:5000/sample-pdf?url=https://www.google.com
 */

export default class GenerateSamplePdfService {
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

    await page.goto(encodeURI(url), {
      waitUntil: 'load'
    })

    const buffer = await page.pdf({
      format: 'a4',
      printBackground: true
    })

    await page.close()

    return buffer
  }
}
