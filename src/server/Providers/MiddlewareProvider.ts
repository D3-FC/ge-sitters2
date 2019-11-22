import { Container, Inject, Service } from 'typedi'
import express, { Express } from 'express'
import logger from 'morgan'
import path from 'path'
import Handler from '../Exceptions/Handler'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { Provider } from './Provider'

@Service()
export default class MiddlewareProvider implements Provider {

  async boot (app: Express) {
    app.use(helmet())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    //TODO:  app.use(csrf({ cookie: true }))
    app.use(
      rateLimit({
        windowMs: 1 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      })
    )
    app.use(logger('dev'))
    app.use(express.static(path.join(__dirname, '../../../public')))
    app.use(Handler.handle)

  }

}

