import { Authorized, Body, CurrentUser, Get, JsonController, Req, UnauthorizedError } from 'routing-controllers'
import UserService from '../../Services/UserService'
import { Inject } from 'typedi'
import passport from 'passport'
import { User } from '../../../common/Entities/User'

class UserRequest {
  id!: number
}

@JsonController('/api/users')
export class UserController {

  @Inject()
  private uS!: UserService

  @Get('/')
  getAll (@Body() body: UserRequest) {

    return this.uS.paginate()
  }

  @Authorized()
  @Get('/me')
  getMe (@CurrentUser() user: User) {
    return user
  }
}
