import Koa from 'koa'
import puppeteer from 'puppeteer'

export interface RouterQuery {
  url?: string
}

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

    const browser = await puppeteer.launch({})

    const page = await browser.newPage()

    page.setExtraHTTPHeaders({
      // 放置额外的 http header
    })

    await page.goto(encodeURI(url), {
      waitUntil: 'load'
    })

    // Get the "viewport" of the page, as reported by the page.
    await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      }
    })

    return await page.pdf({
      format: 'a4'
    })
  }
}
