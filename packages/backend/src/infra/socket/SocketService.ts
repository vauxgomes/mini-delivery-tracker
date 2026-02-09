import { Server as SocketServer, Socket } from 'socket.io'
import { Server as HttpServer } from 'node:http'
import { loggerEvents } from '../shared/LogEventEmitter.js'
import type { IDeliveryUpdate } from '@shared/domain/IDeliveryUpdate.js'

/**
 * SocketService class to handle WebSocket connections and events.
 */
export class SocketService {
  private io: SocketServer

  // Constructor
  constructor(server: HttpServer) {
    this.io = new SocketServer(server, { cors: { origin: '*' } })
    this.initializeEvents() // Separated method for clarity
  }

  /**
   * Initializes Socket.IO event listeners.
   */
  private initializeEvents(): void {
    loggerEvents.info('Initializing Socket.IO events...')

    this.io.on('connection', (socket: Socket) => {
      loggerEvents.info('[WS] (connection)', { id: socket.id })

      // Listeners
      this.handleUpdateLocation(socket)

      socket.on('disconnect', () => {
        loggerEvents.info('[WS] (disconnect)', { id: socket.id })
      })
    })
  }

  /**
   * Handles the 'update-location' event from a connected socket
   * In other words, when a driver updates their location
   *
   * @param socket The socket instance from the connected client.
   */
  private handleUpdateLocation(socket: Socket): void {
    socket.on('update-location', (data: IDeliveryUpdate) => {
      loggerEvents.info('[WS] (update-location)', { driverId: data.driverId })

      socket.broadcast.emit('location-updated', data)
    })
  }
}
