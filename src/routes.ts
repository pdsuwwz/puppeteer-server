import homeController from '@/controllers/home'

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
  }
]
export default routes
