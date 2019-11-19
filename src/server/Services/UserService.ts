import { InjectConnection } from 'typeorm-typedi-extensions'
import { Connection } from 'typeorm'
import { Service } from 'typedi'
import { User } from '../../common/Entities/User'

@Service()
export default class UserService {

  @InjectConnection()
  private c!: Connection;


  paginate(){
    return this.c.manager.find(User);
  }
}
