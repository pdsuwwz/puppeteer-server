import homeController from '@/controllers/home'
import GenerateImageController from '@/controllers/generate-image'
import GeneratePdfController from '@/controllers/generate-pdf'

interface routeConfig {
  path: string
  method: string
  action: unknown
}

const routes: Array<routeConfig> = [
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
    method: 'get',
    action: GeneratePdfController.generate
  }
]
export default routes
