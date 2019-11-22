import { Container, Inject, Service } from 'typedi'
import { createConnection, useContainer as ormUseContainer } from 'typeorm'
import { Express } from 'express'
import { Env } from '../Utility/Env'
import { Provider } from './Provider'

@Service()
export class AppServiceProvider implements Provider {
  @Inject()
  env!: Env

  async boot (app: Express) {
    ormUseContainer(Container)

    this.setUpDB()
  }

  private async setUpDB () {
    const config = this.env.config
    const db: any = config.db

    await createConnection({
      type: db.type,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      entities: config.entities,
      synchronize: db.synchronize,
      logging: db.logging,
    })
  }
}
