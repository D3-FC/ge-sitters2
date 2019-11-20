import { Container, Service } from 'typedi'
import express, { Express } from 'express'
import logger from 'morgan'
import path from "path"
import Handler from '../Exceptions/Handler'

@Service()
export default class MiddlewareProvider {

   register(app: Express, container: Container){
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(Handler.handle)
  }
}
