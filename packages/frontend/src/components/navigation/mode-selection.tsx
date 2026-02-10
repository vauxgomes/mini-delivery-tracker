import { NavLink } from 'react-router'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'

export function ModeSelection() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Choose your mode!</CardTitle>
        <CardDescription>Choose between the options bellow</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Button asChild>
          <NavLink to="/driver">Driver</NavLink>
        </Button>
        <Button variant="outline" asChild>
          <NavLink to="/observer">Observer</NavLink>
        </Button>
      </CardContent>
    </Card>
  )
}
