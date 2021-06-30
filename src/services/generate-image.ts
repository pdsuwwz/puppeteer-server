import puppeteer from 'puppeteer'

export default class GenerateImageService {
  generate = async (): Promise<unknown> => {
    const browser = await puppeteer.launch({})

    const page = await browser.newPage()

    page.setExtraHTTPHeaders({
      // 放置额外的 http header
    })

    await page.goto('http://www.baidu.com', {
      waitUntil: 'load'
    })

    return await page.screenshot({
      omitBackground: true,
      type: 'png'
    })
  }
}
