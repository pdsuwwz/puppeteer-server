import Koa from 'koa'
import GeneratePdfService from '@/services/generate-pdf'

export type Cookies = {
  name: string
  value: string
  domain: string
}

export interface RequestBody {
  /** description... */
  url?: string
  cookies?: Array<Cookies>
  hasMargin?: boolean | true
}

class GeneratePdfController {
  private service: GeneratePdfService = new GeneratePdfService();

  generate = async (ctx: Koa.Context) => {
    const {
      url,
      cookies,
      hasMargin
    }: RequestBody = ctx.request.body

    if (!url) {
      ctx.status = 404
      ctx.body = {
        status: 'NOT-FOUND'
      }
      return
    }


    const pdf = await this.service.generate({
      url,
      cookies,
      hasMargin
    })

    if (Object.prototype.toString.call(pdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = pdf
  };
}

export default new GeneratePdfController()
