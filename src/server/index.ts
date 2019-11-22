import 'reflect-metadata'
import { AppServiceProvider } from './Providers/AppServiceProvider'
import { EventServiceProvider } from './Providers/EventServiceProvider'
import { Container } from 'typedi'
import MiddlewareProvider from './Providers/MiddlewareProvider'
import { Env } from './Utility/Env'
import env from 'dotenv'
import express from 'express'
import { RouteServiceProvider } from './Providers/RouteServiceProvider'
import { AuthServiceProvider } from './Providers/AuthServiceProvider'

env.config()

async function main () {
  const env = Container.get(Env)
  const pipe = env.getPort()

  const app = express()

  Container.get(MiddlewareProvider).boot(app)
  Container.get(AppServiceProvider).boot(app)
  Container.get(AuthServiceProvider).boot(app)
  Container.get(RouteServiceProvider).boot(app)
  Container.get(EventServiceProvider).boot(app)

  app.listen(pipe, 'localhost', () => {
    console.log(`Server is running on: http://localhost:${pipe}/`)
  })

}

export default main
