'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const CommentUser = ({comment}:{comment:string}) => {
  return (
    <div className="flex flex-row gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="font-bold">Demo</p>
        <p>{comment}</p>
      </div>
    </div>

  )
}
