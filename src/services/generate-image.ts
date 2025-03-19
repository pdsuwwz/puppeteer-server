import type { Context } from 'koa'
import puppeteer from 'puppeteer'

/**
 * @example

curl --location --request GET \
'http://localhost:5000/image?url=https://www.baidu.com' \
--output test-image.png

 */

export default class GenerateImageService {
  generate = async (ctx: Context): Promise<unknown> => {
    if (!ctx.query.url) {
      ctx.status = 404
      return {
        status: 'NOT-FOUND',
      }
    }

    const browser = await puppeteer.launch({
      args: [
        '--disable-extensions',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
      ],
    })

    const page = await browser.newPage()

    await page.goto(ctx.query.url as string, {
      waitUntil: 'networkidle2',
    })

    return await page.screenshot({
      omitBackground: true,
      fullPage: true,
      type: 'png',
    })
  }
}
