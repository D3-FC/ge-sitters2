import { Express } from 'express'
import { Action, useExpressServer } from 'routing-controllers'
import passport, { AuthenticateOptions } from 'passport'
import { Container, Inject, Service } from 'typedi'
import { User } from '../../common/Entities/User'
import { Provider } from './Provider'
import { useContainer as routerUseContainer } from 'routing-controllers'
import { Env } from '../Utility/Env'

@Service()
export class RouteServiceProvider implements Provider {

  @Inject()
  env!:Env

  async boot (app: Express) {
    routerUseContainer(Container)
    this.bootstrapRouter(app)
  }

  private bootstrapRouter (app: Express) {
    useExpressServer(app, {
      controllers: this.env.config.controllers,
      middlewares: [],
      authorizationChecker: this.checkAuth.bind(this),
      currentUserChecker: this.getCurrentUser.bind(this),
    })
  }

  private async checkAuth (action: Action): Promise<boolean> {
    const user = await this.authenticate('bearer', action, { session: false })
    action.request.user = user
    return !!user
  }

  private authenticate (strategy: string, action: Action, options: AuthenticateOptions): Promise<User> {
    return new Promise((resolve, reject) => {
      passport.authenticate(strategy, options, (err, user) => {
        if (err) {
          return reject(err)
        }
        return resolve(user)
      })(action.request, action.response, action.next)
    })
  }

  private getCurrentUser (action: Action) {
    return action.request.user
  }

}
