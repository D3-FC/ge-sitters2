import { ConnectionOptions } from 'typeorm'
import { User } from '../../common/Entities/User'

type Constructor<T> = new (...args: any[]) => T;

export class Config {
  db: ConnectionOptions = {
    database: this.parse(process.env.DB_DATABASE || 'test'),
    username: this.parse(process.env.DB_USER || 'root'),
    password: this.parse(process.env.DB_PASSWORD || ''),
    host: this.parse(process.env.DB_HOST || 'localhost'),
    type: this.parse(process.env.DB_DRIVER || 'mysql'),
    port: this.parse(process.env.DB_PORT || '3306'),
    synchronize: this.parse(process.env.DB_SYNC || 'true'),
    logging: this.parse(process.env.DB_LOGGING || 'all'),
  }
  entities: (string | Constructor<any>)[] = [
    `${__dirname}/../../common/Entities/**/*.ts`
  ]
  controllers = [
    `${__dirname}/../Controllers/**/*.ts`
  ]

  private parse (value: any): any {
    // if the value is wrapped in bacticks e.g. (`value`) then just return its value
    if (value.toString().indexOf('`') === 0
      && value.toString().lastIndexOf('`') === value.toString().length - 1) {
      return value.toString().substring(1, value.toString().length - 1)
    }

    // if the value ends in an asterisk then just return its value
    if (value.toString().lastIndexOf('*') === value.toString().length - 1
      && value.toString().indexOf(',') === -1) {
      return value.toString().substring(0, value.toString().length - 1)
    }

    // Boolean
    if (value.toString().toLowerCase() === 'true' || value.toString().toLowerCase() === 'false') {
      return value.toString().toLowerCase() === 'true'
    }

    // Number
    if (!isNaN(value)) {
      return Number(value)
    }

    // Array
    if (value.indexOf(',') !== -1) {
      return value.split(',').map(this.parse)
    }

    return value
  }
}
