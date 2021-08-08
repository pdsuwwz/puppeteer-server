import Koa from 'koa'
import GenerateSimplePdfService from '@/services/generate-simple-pdf'

export interface RouterQuery {
  url?: string
}


class GenerateSimplePdfController {
  private service: GenerateSimplePdfService = new GenerateSimplePdfService();

  generate = async (ctx: Koa.Context) => {
    // https://stackoverflow.com/a/39672914/13202554
    const { url }: RouterQuery = ctx.query

    if (!url) {
      ctx.status = 404
      ctx.body = {
        status: 'NOT-FOUND'
      }
      return
    }

    const pdf = await this.service.generate({
      url
    })

    if (Object.prototype.toString.call(pdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = pdf
  };
}

export default new GenerateSimplePdfController()
