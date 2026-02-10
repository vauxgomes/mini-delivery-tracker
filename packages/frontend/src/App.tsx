import type { IDeliveryUpdate } from '@shared/domain/IDeliveryUpdate'
import type { ILocation } from '@shared/domain/ILocation'
import { useEffect, useState } from 'react'
import { MapDisplay } from './components/MapDisplay'
import { useSocket } from './hooks/useSocket'

const SOCKET_URL = 'http://localhost:3000'

export default function App() {
  const { socket, isConnected } = useSocket(SOCKET_URL)

  const [role, setRole] = useState<'driver' | 'client'>('client')
  const [position, setPosition] = useState<ILocation>({
    latitude: -23.5505,
    longitude: -46.6333
  })

  // Escutar atualizações (Papel do Cliente)
  useEffect(() => {
    if (!socket || !isConnected || role !== 'client') return

    socket.on('location-updated', (data: IDeliveryUpdate) => {
      setPosition(data.location)
    })

    return () => {
      socket.off('location-updated')
    }
  }, [socket, isConnected, role])

  // Simular movimento (Papel do Motorista)
  const simulateMovement = () => {
    if (!socket) return

    // Mock
    const newPos = {
      latitude: position.latitude + (Math.random() - 0.5) * 0.01,
      longitude: position.longitude + (Math.random() - 0.5) * 0.01
    }

    setPosition(newPos)

    socket?.emit('update-location', {
      driverId: 'driver-01',
      location: newPos,
      timestamp: new Date()
    } as IDeliveryUpdate)
  }

  const handleManualMovement = (newPos: ILocation) => {
    if (role !== 'driver' || !socket || !isConnected) return

    // 1. Atualiza o estado local (UI)
    setPosition(newPos)

    // 2. Emite para os observadores
    const update: IDeliveryUpdate = {
      driverId: 'driver-01',
      location: newPos,
      timestamp: new Date()
    }

    socket.emit('update-location', update)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Mini Delivery Tracker</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setRole('driver')}
          className={`px-4 py-2 rounded ${role === 'driver' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Sou Motorista
        </button>
        <button
          onClick={() => setRole('client')}
          className={`px-4 py-2 rounded ${role === 'client' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Sou Cliente
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-lg">
        <MapDisplay
          position={position}
          title={role === 'driver' ? 'Você' : 'Entregador'}
          onLocationSelect={
            role === 'driver' ? handleManualMovement : undefined
          }
        />
      </div>

      {role === 'driver' && (
        <button
          onClick={simulateMovement}
          className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700"
        >
          Simular Movimento (Enviar Socket)
        </button>
      )}

      <p className="text-sm text-gray-500">
        Status:{' '}
        <span className={isConnected ? 'text-green-500' : 'text-red-500'}>
          {isConnected ? 'Conectado' : 'Desconectado'}
        </span>
      </p>
    </div>
  )
}
