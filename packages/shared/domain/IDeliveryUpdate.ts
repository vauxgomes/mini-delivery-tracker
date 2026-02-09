import type { ILocation } from './ILocation'

export interface IDeliveryUpdate {
  driverId: string
  location: ILocation
  timestamp: Date
}
