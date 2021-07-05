import Koa from 'koa'
import GeneratePdfService from '@/services/generate-pdf'

class GeneratePdfController {
  private service: GeneratePdfService = new GeneratePdfService();

  generate = async (ctx: Koa.Context) => {
    const pdf = await this.service.generate(ctx)

    if (Object.prototype.toString.call(pdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = pdf
  };
}

export default new GeneratePdfController()
