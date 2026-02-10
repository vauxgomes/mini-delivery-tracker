import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (url: string) => {
  // Socket instance. Generated once!
  const socket = useMemo(
    () =>
      io(url, {
        transports: ['websocket'],
        autoConnect: true
      }),
    [url]
  )

  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    // Safety check
    if (socket.connected) onConnect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [socket])

  return { socket, isConnected }
}
