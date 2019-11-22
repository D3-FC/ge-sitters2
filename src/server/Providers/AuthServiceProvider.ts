import { Provider } from './Provider'
import passport from 'passport'
import { Express } from 'express'
import { Container } from 'typedi'
import UserService from '../Services/UserService'
import { Strategy as BearerStrategy } from 'passport-http-bearer'

export class AuthServiceProvider implements Provider {

  async boot (app: Express): Promise<void> {
    app.use(passport.initialize())
    this.registerPassport()
  }

  private registerPassport () {
    const userService = Container.get(UserService)

    passport.use(new BearerStrategy(
      async function (token, done) {
        try {
          const user = await userService.getOne(1)
          if (!user) done(null, false)
          return done(null, user)
        } catch (e) {
          done(e)
        }
      }
    ))
  }
}
