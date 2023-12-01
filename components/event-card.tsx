'use client';

import { Bookmark, MoreVertical, MapPin, Clock, Share, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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

import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BlockRenderer } from "@/components/ui/block-renderer";
import { CommentUser } from "@/components/ui/comment";
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { supabaseBrowserClient } from "@/lib/supabase";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "./ui/skeleton";


interface CardProps extends React.ComponentProps<typeof Card> {
  event: any
}

const CommentSection = ({ eventId }: { eventId: string }) => {
  const { data, error, isLoading } = useSWR(`/api/events/comments?eventId=${eventId}`, fetcher)
  const [comment, setComment] = useState("")
  const { toast } = useToast()
  const handleComment = async () => {
    // save to supabase
    console.log(comment)
    const userSession = await supabaseBrowserClient.auth.getSession()
    const { data, error } = await supabaseBrowserClient.from('event_comments').insert({ 'user_id': userSession.data.session?.user.id, 'event_id': eventId, 'comment': comment }).select()
    console.log(error)
    if (data) {
      toast({
        title: "Comment Sent!",
      })
    } else if (error) {
      toast({
        title: "There was an error",
        description: error.message
      })
    }
  }
  return (
    <CardContent className="grid gap-4">
      <Separator />
      <Textarea placeholder="Type your message here." onChange={e => setComment(e.target.value)} />
      <Button disabled={comment === "" ? true : false} onClick={handleComment}>Send</Button>
      {isLoading ? (
        <CardContent className="grid gap-4">
          <Separator />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
      ) : (
        <>
          {data?.data.map((comment) => (
            <CommentUser key={comment.id} comment={comment.comment} />
          ))}
          {data?.data.length === 0 ? (
            <>
              <Separator />
              <p className="mx-auto flex items-center justify-center">No one has made any comments..yet.</p>
            </>
          ) : null}
        </>
      )}
    </CardContent>
  )
}

export function EventCard({ className, event, ...props }: CardProps) {
  const [showComment, setShowComment] = useState(false)
  const [saved, setIsSaved] = useState(false)
  const [expand, setExpand] = useState(false)
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("")
  const { toast } = useToast()
  const [applyInfo, setApplyInfo] = useState({
    name: "",
    email: "",
    stuid: ""
  })
  const handleApply = async () => {
    // save to supabase
    const userSession = await supabaseBrowserClient.auth.getSession()
    const { data, error } = await supabaseBrowserClient.from('user_applied_event').insert({ 'user_id': userSession.data.session?.user.id, 'event_id': event.id, 'name': applyInfo.name }).select()
    if (data) {
      return true
    } else if (error) {
      return false
    }
  }
  const handleSave = async () => {
    // save to supabase
    const userSession = await supabaseBrowserClient.auth.getSession()
    if (await supabaseBrowserClient.from('user_saved_event').select().eq('user_id', userSession.data.session?.user.id!).eq('event_id', event.id).then(res => res?.data?.length !== undefined && res?.data?.length > 0)) {
      const { data, error } = await supabaseBrowserClient.from('user_saved_event').delete().eq('user_id', userSession.data.session?.user.id!).eq('event_id', event.id).select()
      if (data) {
        return true
      } else if (error) {
        return false
      }
    } else {
      const { data, error } = await supabaseBrowserClient.from('user_saved_event').insert({ 'user_id': userSession.data.session?.user.id, 'event_id': event.id }).select()
      if (data) {
        return true
      } else if (error) {
        return false
      }
    }
  }
  useEffect(() => {
    const {data} = supabaseBrowserClient.storage.from('image').getPublicUrl(event.cover_image_url)
    setImageUrl(data.publicUrl)
  }, [])
  console.log(imageUrl)
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{event.event_name}</CardTitle>
        <CardDescription className="flex flex-row items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          SSC
        </CardDescription>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <MapPin />Demo
          </div>
          <div className="flex flex-row items-center gap-2">
            <Clock />
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
      <CardContent className={`flex gap-4 ${!expand ? "cursor-pointer flex-row hover:text-slate-500" : "flex-col"}`} onClick={() => !expand ? setExpand(!expand) : null}>
        {event.cover_image_url !== null ? <Image src={imageUrl} width='250' height='125' alt="Image" className="rounded-md object-cover" /> : <> </>}
        <div>
          <BlockRenderer blocks={event.event_data} isClamped={expand} />
          {expand ? (
            <Button onClick={() => expand ? setExpand(!expand) : null} variant={"ghost"}>
              Collapse
            </Button>
          ) : (<> </>)}

        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 ">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                Apply
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Apply for the event</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click apply when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    onChange={(e) => setApplyInfo({ ...applyInfo, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue="s216743@hsu.edu.hk"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stuid" className="text-right">
                    Student ID
                  </Label>
                  <Input
                    id="stuid"
                    defaultValue="S216743"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={(e) => {
                  e.preventDefault()
                  handleApply().then((res) => {
                    console.log(res)
                    if (res) {
                      toast({
                        title: "Event Applied",
                      })
                    } else {
                      toast({
                        title: "Error!",
                        description: "Please try again later."
                      })
                    }
                    setOpen(!open)
                  })
                }}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant={"secondary"} onClick={(e) => {
            e.preventDefault()
            handleSave().then((res) => {
              console.log(res)
              if (res) {
                toast({
                  title: saved ? "Event Unsaved" : "Event Saved",
                })
                setIsSaved(!saved)
              } else {
                toast({
                  title: "Error!",
                  description: "Please try again later."
                })
              }
            })
            setIsSaved(!saved)
          }}>
            {saved ? (
              <Check className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          <Toaster />
        </div>
        <div className="xs:gap-2 flex">
          <Button variant={"link"} className="flex gap-4" onClick={() => setShowComment(!showComment)}>
            <MessageCircle className=" h-4 w-4" />23
          </Button>
          <Button variant={"link"}>
            <Share className=" h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
      {
        showComment ? (
          <CommentSection eventId={event.id} />
        ) : (<></>)
      }
    </Card >
  )
}
