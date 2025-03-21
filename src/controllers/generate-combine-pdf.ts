import type { RequestBody } from '@/controllers/generate-pdf'
import type { Context, Request } from 'koa'

import GenerateCombinePdfService from '@/services/generate-combine-pdf'
import GeneratePdfService from '@/services/generate-pdf'

interface RequestCombinePDF extends Request {
  body: {
    pdfList: RequestBody[]
  }
}

interface ContextCombinePDF extends Context {
  request: RequestCombinePDF
}


class GenerateCombinePdfController {
  private pdfService: GeneratePdfService = new GeneratePdfService()
  private service: GenerateCombinePdfService = new GenerateCombinePdfService()

  generate = async (ctx: ContextCombinePDF) => {
    let { pdfList = [] } = ctx.request.body

    pdfList = pdfList.filter((pdfItem) => {
      return pdfItem.url
    })

    if (!pdfList.length) {
      ctx.status = 404
      ctx.body = {
        status: 'NOT-FOUND',
      }
      return
    }


    const pdfPromises = pdfList.map((pdfItem) => {
      return this.pdfService.generate(pdfItem)
    })

    const totalPdf = await this.service.generate(
      ...pdfPromises,
    )

    if (Object.prototype.toString.call(totalPdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = totalPdf
  }
}

export default new GenerateCombinePdfController()
