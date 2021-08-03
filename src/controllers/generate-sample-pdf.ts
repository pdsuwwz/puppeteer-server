import Koa from 'koa'
import GenerateSamplePdfService from '@/services/generate-sample-pdf'

class GenerateSamplePdfController {
  private service: GenerateSamplePdfService = new GenerateSamplePdfService();

  generate = async (ctx: Koa.Context) => {
    const pdf = await this.service.generate(ctx)

    if (Object.prototype.toString.call(pdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = pdf
  };
}

export default new GenerateSamplePdfController()
