import { PORT } from '@/config'
import routes from '@/routes'
import { getLocalAddress } from '@/utils'
import Cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()


// routes
routes.forEach((route) => {
  const method = router[route.method]
  method.call(router, route.path, route.action)
})


app.use(Cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.clear()

  const address = getLocalAddress()
  const localhost = address[Object.keys(address)[0]]?.[0]

  const blank1 = ''.padStart(1)
  const blank2 = ''.padStart(2)

  console.log(
    '\n',
    blank1,
    '🚀🚀🚀',
    '\x1B[32m',
    'Puppeteer Server running at:\n',
    '\x1B[0m',
  )
  console.log(
    blank2,
    '> Local:  ',
    '\x1B[36m',
    `http://localhost:${PORT}/`,
    '\x1B[0m',
  )
  console.log(
    blank2,
    '> Network:',
    '\x1B[36m',
    `http://${localhost}:${PORT}/\n`,
    '\x1B[0m',
  )
})
