import homeController from '@/controllers/home'
import GenerateImageController from '@/controllers/generate-image'
import GeneratePdfController from '@/controllers/generate-pdf'
import GenerateSimplePdfController from '@/controllers/generate-simple-pdf'
import GenerateCombinePdfController from '@/controllers/generate-combine-pdf'

interface RouteConfig {
  path: string
  method: string | 'get' | 'post' | 'delete' | 'put'
  action: unknown
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    method: 'get',
    action: homeController.hello
  },
  {
    path: '/image',
    method: 'get',
    action: GenerateImageController.generate
  },
  {
    path: '/pdf',
    method: 'post',
    action: GeneratePdfController.generate
  },
  {
    path: '/simple-pdf',
    method: 'get',
    action: GenerateSimplePdfController.generate
  },
  {
    path: '/combine-pdf',
    method: 'post',
    action: GenerateCombinePdfController.generate
  }
]
export default routes
