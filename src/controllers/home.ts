import type { Context } from 'koa'
import HomeService from '@/services/home'

class HomeController {
  private service: HomeService = new HomeService()

  hello = async (ctx: Context) => {
    ctx.body = await this.service.hello()
  }
}

export default new HomeController()
