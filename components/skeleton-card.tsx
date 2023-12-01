'use client'
import { MapPin, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton";

// extend component props add more props
type CardProps = React.ComponentProps<typeof Card>

export function SkeletonCard({ className, ...props }: CardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[250px]" />
        </CardTitle>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <MapPin />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Clock />
            <div className="flex flex-col">
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <p>-</p>
            <div className="flex flex-col">
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`flex flex-row gap-4 hover:text-slate-500`}>
        <Skeleton className="h-[10em] w-[15em]" />
        <div>
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="mt-2 h-10 w-[100px]" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[100px]" />
      </CardFooter>
    </Card>
  )
}
