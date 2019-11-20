import { Service } from 'typedi'
import { Config } from '../Config/app'

@Service()
export class Env {
  private normalizePort (val: string): number | string {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
      // named pipe
      return val
    }
    if (port >= 0) {
      // port number
      return port
    }
    return 3000
  }

  getPipe (): number | string {
    return this.normalizePort(process.env.PORT || '3000')
  }

  getPort (): number {
    const pipe = this.getPipe()
    return typeof pipe === 'string' ? 3000 : pipe
  }

  get config (): Config {
    return new Config()
  }
}
