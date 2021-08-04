import homeController from '@/controllers/home'
import GenerateImageController from '@/controllers/generate-image'
import GeneratePdfController from '@/controllers/generate-pdf'
import GenerateSamplePdfController from '@/controllers/generate-sample-pdf'

interface routeConfig {
  path: string
  method: string | 'get' | 'post' | 'delete' | 'put'
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
    method: 'post',
    action: GeneratePdfController.generate
  },
  {
    path: '/sample-pdf',
    method: 'get',
    action: GenerateSamplePdfController.generate
  }
]
export default routes
