import { Controller, Get } from 'routing-controllers'
import UserService from '../../Services/UserService'
import { Inject } from 'typedi'

@Controller()
export class UserController {

  @Inject()
  private uS!: UserService;

  @Get("/users")
  getAll() {
    return this.uS.paginate()
  }
}
