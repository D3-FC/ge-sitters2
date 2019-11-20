import { ConnectionOptions } from 'typeorm'

function parse (value: any): any {
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
    return value.split(',').map(parse)
  }

  return value
}


export class Config {
  db: ConnectionOptions = {
    database: parse(process.env.DB_DATABASE || 'test'),
    username: parse(process.env.DB_USER || 'root'),
    password: parse(process.env.DB_PASSWORD || ''),
    host: parse(process.env.DB_HOST || 'localhost'),
    type: parse(process.env.DB_DRIVER || 'mysql'),
    port: parse(process.env.DB_PORT || '3306'),
    synchronize: parse(process.env.DB_SYNC || 'true'),
    logging: parse(process.env.DB_LOGGING || 'all'),
  }
  entities = process.env.ENTITIES || '/common/Entities/**/*.ts'
  controllers = process.env.CONTROLLERS || '/Controllers/**/*.ts'
}
