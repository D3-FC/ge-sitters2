import { JsonController, Post } from 'routing-controllers'
import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import UserService from '../../Services/UserService'
import { Inject } from 'typedi'

@JsonController('/oauth')
export class OAuthController {


  @Post('/token')
  async login () {
//    passport.authenticate('bearer', { session: false })
    return 'aaa'
  }
}
