import 'reflect-metadata'

import express, { Express } from 'express'
import logger from 'morgan'
import path from 'path'
import Handler from './Exceptions/Handler'
import { createExpressServer } from 'routing-controllers'
import theDebugger from 'debug'
import { UserController } from './Controllers/User/UserController'
import { HomeController } from './Controllers/HomeController'
import { createConnection } from 'typeorm'

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error:any) {

  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */

const debug = theDebugger('ge-sitters:api')
const port = normalizePort(process.env.PORT || '3000');
console.log('__dirname', __dirname)
const app = createExpressServer({
  controllers: [
    __dirname + "/Controllers/**/*.ts"
  ]
})


app.on('error', onError)


// --=== MIDDLEWARES ===--
app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(Handler.handle)

async function main () {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ge-sitters-node",
    entities: [
      __dirname + "/../common/Entities/**/*.ts"
    ],
    synchronize: true,
    logging: false
  })

  app.listen(port, ()=>{
    console.log(`Server is running on: http://localhost:${port}/`)
  })
}

export default main
