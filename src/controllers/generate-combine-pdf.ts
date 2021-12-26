import Koa from 'koa'

import GeneratePdfService from '@/services/generate-pdf'
import GenerateCombinePdfService from '@/services/generate-combine-pdf'
import { RequestBody } from '@/controllers/generate-pdf'

class GenerateCombinePdfController {
  private pdfService: GeneratePdfService = new GeneratePdfService()
  private service: GenerateCombinePdfService = new GenerateCombinePdfService()

  generate = async (ctx: Koa.Context) => {
    let {
      pdfList = []
    }: {
      pdfList: RequestBody[]
    } = ctx.request.body

    pdfList = pdfList.filter((pdfItem) => {
      return pdfItem.url
    })

    if (!pdfList.length) {
      ctx.status = 404
      ctx.body = {
        status: 'NOT-FOUND'
      }
      return
    }


    const pdfPromises = pdfList.map((pdfItem) => {
      return this.pdfService.generate(pdfItem)
    })

    const totalPdf = await this.service.generate(
      ...pdfPromises
    )

    if (Object.prototype.toString.call(totalPdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = totalPdf
  }
}

export default new GenerateCombinePdfController()
