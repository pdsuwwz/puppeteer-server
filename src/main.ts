import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { PORT } from '@/config'
import routes from '@/routes'

const app: Koa = new Koa()
const router: Router = new Router()

// routes
routes.forEach((route) => {
  const params = [
    route.path,
    route.action
  ]
  router[route.method](...params)
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)

console.log(`🚀 Listening on: http://localhost:${PORT}`)
