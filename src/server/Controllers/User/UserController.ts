import { Body, Controller, Get, JsonController } from 'routing-controllers'
import UserService from '../../Services/UserService'
import { Inject } from 'typedi'

class UserRequest {
  id!: number
}

@JsonController('/users')
export class UserController {

  @Inject()
  private uS!: UserService

  @Get('/')
  getAll (@Body() body: UserRequest) {
    return body.id
  }
}
