'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const CommentUser = () => {
  return (
    <div className="flex flex-row gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="font-bold">Demo</p>
        <p>The fact they did it at the Library stage and not the Mainstage makes it legendary. Matisse & Sadko were sheduled for a 2h30 set, what I thought was strange. But instead of Matisse and Sadko, you see these 2 legends popping up.  The vibes and the disbelief were so big that the crowd went completely wild. By far my favorite Tomorrowland set of all time. And that goes from a guy who's been there for 11 years straight. Thankyou</p>
      </div>
    </div>

  )
}
