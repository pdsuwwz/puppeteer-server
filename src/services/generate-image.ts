import Koa from 'koa'
import puppeteer from 'puppeteer'

/**
 * @example http://localhost:5000/image?url=https://www.google.com
 */

export default class GenerateImageService {
  generate = async (ctx: Koa.Context): Promise<unknown> => {
    if (!ctx.query.url) {
      ctx.status = 404
      return {
        status: 'NOT-FOUND'
      }
    }

    const browser = await puppeteer.launch({
      args: [
        '--disable-extensions',
        '--disable-web-security'
      ]
    })

    const page = await browser.newPage()

    await page.goto(ctx.query.url as string, {
      waitUntil: 'networkidle0'
    })

    return await page.screenshot({
      omitBackground: true,
      fullPage: true,
      type: 'png'
    })
  }
}
