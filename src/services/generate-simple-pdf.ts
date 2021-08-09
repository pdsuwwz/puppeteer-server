import puppeteer from 'puppeteer'
import { RouterQuery } from '@/controllers/generate-simple-pdf'

/**
 * @example

curl --location --request GET \
'http://localhost:5000/simple-pdf?url=https://www.google.com/' \
--output test-simple-pdf.pdf

 */

export default class GenerateSimplePdfService {
  generate = async (params: RouterQuery): Promise<Buffer> => {

    const { url } = params

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
      waitUntil: 'networkidle2'
    })

    const buffer = await page.pdf({
      format: 'a4',
      printBackground: true
    })

    await page.close()

    return buffer
  }
}
