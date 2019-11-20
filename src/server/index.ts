import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { AppServiceProvider } from './Providers/AppServiceProvider'
import { EventServiceProvider } from './Providers/EventServiceProvider'
import { Container } from 'typedi'
import MiddlewareProvider from './Providers/MiddlewareProvider'
import { Env } from './Utility/Env'
import env from 'dotenv'

env.config()

const app = createExpressServer({
  controllers: [
    __dirname + '/Controllers/**/*.ts'
  ]
})

async function main () {
  const env = Container.get(Env)
  const pipe = env.getPipe()

  Container.get(EventServiceProvider).register(app, Container)
  Container.get(MiddlewareProvider).register(app, Container)
  Container.get(AppServiceProvider).register(app, Container)

  app.listen(pipe, 'localhost', () => {
    console.log(`Server is running on: http://localhost:${pipe}/`)
  })
}

export default main
