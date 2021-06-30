import Koa from 'koa'
import GenerateImageService from '@/services/generate-image'

class GenerateImageController {
  private service: GenerateImageService = new GenerateImageService();

  generate = async (ctx: Koa.Context) => {
    ctx.body = await this.service.generate()
    ctx.type = 'image/png'
  };
}

export default new GenerateImageController()
