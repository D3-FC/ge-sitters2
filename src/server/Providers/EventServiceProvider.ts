import { Express } from 'express'
import { Container, Inject, Service } from 'typedi'
import { Env } from '../Utility/Env'
import { Provider } from './Provider'

@Service()
export class EventServiceProvider implements Provider {
  @Inject()
  env!: Env

  async boot (app: Express) {
    app.on('error', this.onError)
  }

  async onError (error: any) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const port = this.env.getPipe()

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

}
