import Koa from 'koa'
import GenerateSimplePdfService from '@/services/generate-simple-pdf'

class GenerateSimplePdfController {
  private service: GenerateSimplePdfService = new GenerateSimplePdfService();

  generate = async (ctx: Koa.Context) => {
    const pdf = await this.service.generate(ctx)

    if (Object.prototype.toString.call(pdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = pdf
  };
}

export default new GenerateSimplePdfController()
