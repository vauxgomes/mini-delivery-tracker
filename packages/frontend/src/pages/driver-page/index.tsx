import { MapDisplay } from '@/components/map/map-display'
import { ShowStatus } from '@/components/status/connection-status.tsx/connection-status'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSocket } from '@/hooks/useSocket'
import type { IDeliveryUpdate } from '@shared/domain/IDeliveryUpdate'
import type { ILocation } from '@shared/domain/ILocation'
import { CarFront } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function DriverPage() {
  // Socket
  const { socket, isConnected } = useSocket(import.meta.env.VITE_SOCKET_URL)

  // Starting position (São Paulo)
  const [position, setPosition] = useState<ILocation>({
    latitude: -23.5505,
    longitude: -46.6333
  })

  const handleSetPosition = useCallback(
    (newPosition: ILocation) => {
      if (!socket || !isConnected) return

      // Position
      setPosition(newPosition)

      // Socket emit
      const payload: IDeliveryUpdate = {
        driverId: 'driver-01',
        location: newPosition,
        timestamp: new Date()
      }

      socket.emit('update-location', payload)
    },
    [socket, isConnected]
  )

  const handleRandomJump = useCallback(() => {
    if (!socket || !isConnected) return

    // New random position
    const newPosition = {
      latitude: position.latitude + (Math.random() - 0.5) * 0.01,
      longitude: position.longitude + (Math.random() - 0.5) * 0.01
    } as ILocation

    handleSetPosition(newPosition)
  }, [socket, isConnected, position, handleSetPosition])

  return (
    <TooltipProvider>
      <Card className="w-350 max-w-[80%] dark:bg-zinc-800">
        <CardHeader className="border-b">
          <CardTitle className="flex items-enter gap-2 ">
            <CarFront size={18} />
            <span>Driver's view</span>
          </CardTitle>
          <CardDescription>Driver's location</CardDescription>
          <CardAction className="flex gap-2">
            <ShowStatus isConnected={isConnected} />
            <Button variant="outline" onClick={handleRandomJump} size="sm">
              Random Jump
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="h-[80%] min-h-100">
          <MapDisplay
            position={position}
            title="driver-01"
            onLocationSelect={handleSetPosition}
          />
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
