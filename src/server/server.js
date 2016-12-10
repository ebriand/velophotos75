import { Server } from 'hapi'
import plugins from './config/plugins'
import routes from './routes'

const server = new Server()
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 9000,
})

server.register(plugins,
  (err) => {
    if (err) throw err
    server.route(routes())
  },
)

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
