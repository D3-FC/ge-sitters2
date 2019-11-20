import { Container, Inject, Service } from 'typedi'
import { useContainer as routerUseContainer } from 'routing-controllers'
import { createConnection, useContainer as ormUseContainer } from 'typeorm'
import { Express } from 'express'
import { Env } from '../Utility/Env'

@Service()
export class AppServiceProvider {
  @Inject()
  env!: Env

  register (app: Express, container: Container) {
    routerUseContainer(Container)
    ormUseContainer(Container)

    const config = this.env.config
    const db: any = config.db
    createConnection({
      type: db.type,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      entities: [
        `${__dirname}/../..${config.entities}`
      ],
      synchronize: db.synchronize,
      logging: db.logging,
    })
  }
}
