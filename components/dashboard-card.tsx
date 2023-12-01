'use client';

import {Bookmark, MoreVertical, MapPin, Clock, Share, MessageCircle, Check} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast"
import {Toaster} from "@/components/ui/toaster"
import {Input} from "@/components/ui/input"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {BlockRenderer} from "@/components/ui/block-renderer";
import {CommentUser} from "@/components/ui/comment";
import {Separator} from "@/components/ui/separator"
import {useState} from "react";
import Image from "next/image"
import {AspectRatio} from "@/components/ui/aspect-ratio"
import Link from "next/link";
import { supabaseBrowserClient } from "@/lib/supabase";

// extend component props add more props
interface CardProps extends React.ComponentProps<typeof Card>{
  id:string,
  eventName: string,
  eventOwner: string,
  eventLocation?: string,
  eventStartTime?: string,
  eventEndTime?: string,
  eventDescription?: string,
  appliedCount: number,
  commentCount: number,
}
export const revalidate = 0

export function DashboardCard({id,className,eventName,eventDescription,appliedCount,commentCount,...props}: CardProps) {
  const [showComment, setShowComment] = useState(false)
  const [saved, setIsSaved] = useState(false)
  const [expand, setExpand] = useState(false)
  const {toast} = useToast()
  async function handleDelete(event: MouseEvent) {
    event.preventDefault()
    const res = await supabaseBrowserClient.from('event').delete().eq('id',id).select()
    if (res.error) {
      console.error(res.error)
    } else {
      console.log(res)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{eventName}</CardTitle>
        <CardDescription className="flex flex-row items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src="https://github.com/shadcn.png"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          SSC
        </CardDescription>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <MapPin/>Demo
          </div>
          <div className="flex flex-row items-center gap-2">
            <Clock/>
            <div className="flex flex-col">
              <p>2023/07/20</p>
              <p>12:30 AM</p>
            </div>
            <p>-</p>
            <div className="flex flex-col">
              <p>2023/07/20</p>
              <p>12:30 AM</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <Link href={`dashboard/event/${id}`}>
        <CardContent className={`flex cursor-pointer flex-row gap-4 hover:text-slate-500`}>
          <Image src="/image8.png" width='250' height='125' alt="Image" className="rounded-md object-cover"/>
          <div>
            <BlockRenderer blocks={eventDescription} isClamped={false}/>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 ">
          <Button>
            {appliedCount} Applied
          </Button>
          <Button variant={"secondary"} className="flex gap-2">
            <Bookmark className=" h-4 w-4"/> {commentCount}
          </Button>
        </div>
        <div className="xs:gap-2 flex">
          <Button variant={"link"} className="flex gap-4" onClick={() => setShowComment(!showComment)}>
            <MessageCircle className=" h-4 w-4"/>23
          </Button>
          <Button variant={"link"}>
            <Share className=" h-4 w-4"/>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-4 w-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}
