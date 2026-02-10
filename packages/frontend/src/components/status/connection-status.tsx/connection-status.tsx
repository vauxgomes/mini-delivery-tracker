import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function ShowStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <span
            className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>{isConnected ? 'Online' : 'Offline'}</TooltipContent>
    </Tooltip>
  )
}
