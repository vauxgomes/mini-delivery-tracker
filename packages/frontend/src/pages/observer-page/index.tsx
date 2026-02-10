import { MapDisplay } from '@/components/map/map-display'
import { ShowStatus } from '@/components/status/connection-status.tsx/connection-status'
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
import { Map } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DriverPage() {
  // Socket
  const { socket, isConnected } = useSocket(import.meta.env.VITE_SOCKET_URL)

  // Starting position (São Paulo)
  const [position, setPosition] = useState<ILocation>({
    latitude: -23.5505,
    longitude: -46.6333
  })

  // Position update handler
  useEffect(() => {
    if (!socket || !isConnected) return

    socket.on('location-updated', (data: IDeliveryUpdate) => {
      setPosition(data.location)
    })

    return () => {
      socket.off('location-updated')
    }
  }, [socket, isConnected])

  return (
    <TooltipProvider>
      <Card className="w-350 max-w-[80%] dark:bg-zinc-800">
        <CardHeader className="border-b">
          <CardTitle className="flex items-enter gap-2 ">
            <Map size={18} />
            <span>Observer's view</span>
          </CardTitle>
          <CardDescription>Watch driver's location updates</CardDescription>
          <CardAction className="flex gap-2">
            <ShowStatus isConnected={isConnected} />
          </CardAction>
        </CardHeader>
        <CardContent className="h-[60%]">
          <MapDisplay position={position} title="driver-01" minHeight={50}/>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
