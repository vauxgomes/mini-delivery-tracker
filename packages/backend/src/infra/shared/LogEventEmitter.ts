/**
 * References:
 * - Type Safety: https://danilafe.com/blog/typescript_typesafe_events/
 */

import { EventEmitter } from 'node:events'

// Biding event names to their argument types for type safety
type LogEvents = {
  info: [message: string, context?: any]
  warning: [message: string, context?: any]
  error: [message: string, error: any]
}

class LogEventEmitter extends EventEmitter {
  // Constructor
  constructor() {
    super()

    // Subscribers
    this.on('info', (msg, ctx) => {
      console.log(`[INFO] [${new Date().toISOString()}] ${msg}`, ctx || '')
    })

    // this.on('warning', (msg, ctx) => {
    //   console.warn(`[WARNING] [${new Date().toISOString()}] ${msg}`, ctx || '')
    // })

    // this.on('error', (msg, err) => {
    //   console.error(`[ERROR] [${new Date().toISOString()}] ${msg}`, err)
    // })
  }

  // Type Safety
  override emit<K extends keyof LogEvents>(
    event: K,
    ...args: LogEvents[K]
  ): boolean {
    return super.emit(event, ...args)
  }

  // Type Safety
  override on<K extends keyof LogEvents>(
    event: K,
    listener: (...args: LogEvents[K]) => void
  ): this {
    return super.on(event, listener)
  }

  /**
   * Simplified method for emitting info logs
   *
   * @param msg The log message
   * @param ctx Optional context (e.g., additional data or metadata)
   */
  info(msg: string, ctx?: any) {
    this.emit('info', msg, ctx)
  }
}

// Publisher
export const loggerEvents = new LogEventEmitter()
