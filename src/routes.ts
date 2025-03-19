import type Router from 'koa-router'
import GenerateCombinePdfController from '@/controllers/generate-combine-pdf'
import GenerateImageController from '@/controllers/generate-image'
import GeneratePdfController from '@/controllers/generate-pdf'
import GenerateSimplePdfController from '@/controllers/generate-simple-pdf'
import homeController from '@/controllers/home'

type HttpMethodKeys = Extract<keyof Router,
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
>

interface RouteConfig {
  path: string
  // method: string | 'get' | 'post' | 'delete' | 'put'
  method: HttpMethodKeys
  action: Router.IMiddleware<any, any>
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    method: 'get',
    action: homeController.hello,
  },
  {
    path: '/image',
    method: 'get',
    action: GenerateImageController.generate,
  },
  {
    path: '/pdf',
    method: 'post',
    action: GeneratePdfController.generate,
  },
  {
    path: '/simple-pdf',
    method: 'get',
    action: GenerateSimplePdfController.generate,
  },
  {
    path: '/combine-pdf',
    method: 'post',
    action: GenerateCombinePdfController.generate,
  },
]
export default routes
