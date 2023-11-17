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


type CardProps = React.ComponentProps<typeof Card>

const blocks = {
  "time": 1550476186479,
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "Editor.js",
        "level": 2
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "Hey. Meet the new Editor. On this page you can see it in action — try to create this text. Source code of the page contains the example of connection and configuration."
      }
    },
    {
      "type": "header",
      "data": {
        "text": "Key features",
        "level": 3
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": `「順龍仁澤 學義同行」服務學習實踐計劃 (VolTrekkers) 由2016年開展至今，帶領恒大同學運用課堂知識，組織服務以貢獻社會，從反思活動的過程中得到啟發，促進個人成長。


        本學年，計劃將帶領恒大同學一同探索本地三大主題：長者、殘疾人士及基層兒童。完成本地服務後的同學，更有機會衝出香港，到東南亞國家（馬來西亞、越南等）進行海外服務，挑戰自己！`
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": `「順龍仁澤 學義同行」服務學習實踐計劃 (VolTrekkers) 由2016年開展至今，帶領恒大同學運用課堂知識，組織服務以貢獻社會，從反思活動的過程中得到啟發，促進個人成長。


        本學年，計劃將帶領恒大同學一同探索本地三大主題：長者、殘疾人士及基層兒童。完成本地服務後的同學，更有機會衝出香港，到東南亞國家（馬來西亞、越南等）進行海外服務，挑戰自己！`
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": `「順龍仁澤 學義同行」服務學習實踐計劃 (VolTrekkers) 由2016年開展至今，帶領恒大同學運用課堂知識，組織服務以貢獻社會，從反思活動的過程中得到啟發，促進個人成長。


        本學年，計劃將帶領恒大同學一同探索本地三大主題：長者、殘疾人士及基層兒童。完成本地服務後的同學，更有機會衝出香港，到東南亞國家（馬來西亞、越南等）進行海外服務，挑戰自己！`
      }
    },
  ],
  "version": "2.8.1"
}

export function DashboardCard({className, ...props}: CardProps) {
  const [showComment, setShowComment] = useState(false)
  const [saved, setIsSaved] = useState(false)
  const [expand, setExpand] = useState(false)
  const {toast} = useToast()

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
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
      <Link href={"dashboard/event/a"}>
        <CardContent className={`flex gap-4 flex-row hover:text-slate-500 cursor-pointer`}
                     onClick={() => !expand ? setExpand(!expand) : null}>
          <Image src="/image8.png" width='250' height='125' alt="Image" className="rounded-md object-cover"/>
          <div>
            <BlockRenderer blocks={blocks} isClamped={false}/>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 ">
          <Button>
            21 Applied
          </Button>
          <Button variant={"secondary"} className="flex gap-2">
            <Bookmark className=" h-4 w-4"/> 21
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
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}
