import { createServer } from 'node:http'
import { app } from './app.js'
import { loggerEvents } from './infra/shared/LogEventEmitter.js'
import { SocketService } from './infra/socket/SocketService.js'

async function bootstrap() {
  try {
    // Env
    const PORT = process.env.PORT || 3000

    // Server
    const httpServer = createServer(app) // App comes from express

    // WebSocket Service
    new SocketService(httpServer)

    httpServer.listen(PORT, () => {
      loggerEvents.info(`Server running on port ${PORT}`)
    })

    // Unhandled Rejection
    process.on('unhandledRejection', (reason) => {
      loggerEvents.emit('error', 'Unhandled Rejection detectada', reason)
    })
  } catch (error) {
    loggerEvents.emit('error', 'Failed to start server', error)
    process.exit(1)
  }
}

bootstrap()
