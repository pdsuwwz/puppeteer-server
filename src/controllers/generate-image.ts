import Koa from 'koa'
import GenerateImageService from '@/services/generate-image'

class GenerateImageController {
  private service: GenerateImageService = new GenerateImageService()

  generate = async (ctx: Koa.Context) => {
    const img = await this.service.generate(ctx)
    if (Object.prototype.toString.call(img) === '[object Uint8Array]') {
      ctx.type = 'image/png'
    }
    ctx.body = img
  }
}

export default new GenerateImageController()
