'use client';

import { Bookmark, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function EventCard({ className, ...props }: CardProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription className="flex flex-row items-center gap-2">
          <Avatar className="w-5 h-5">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          SSC
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p>各位同學,



          由香港特區政府財庫局主辦的「灣區專上學生金融科技雙向實習計劃」，旨在讓香港及大灣區內地城市修讀金融科技課程的專上學生在金融科技企業跨境實習，及早培養其投身金融科技事業的興趣，藉以壯大本地的金融科技人才庫。



          計劃當中的冬季實習計劃由即日起至2023年11月30日接受申請，實習期為最少兩個月。



          申請者必須是：

          i)              年滿18歲，在香港或大灣區內地城市有開設金融科技相關學科的專上院校修讀的全日制學生，當中包括高級文憑及副學士學生、本科生、碩士生或研究生。計劃接受主修、副修或專修金融科技相關學科，或曾修讀兩個或以上與金融科技相關科目的申請者參加。 數碼港會尋求參與院校核實申請者的資格，或按個別情況考慮申請者的學科是否符合資格。

          ii)             持有效身份證明文件及/或簽證；及

          iii)           沒有同時領取香港特區內地城市政府在其他公共資助計劃的實習津貼；及

          iv)           並非為所申請實習職位之參與企業的東主、董事、合夥人或股東，或其親屬；及

          v)            於計劃申請期前3個月內未曾獲聘於所申請實習職位之參與企業或其關聯公司。



          香港及大灣區內地城市的實習職位申請資格如下：

          -          香港的實習職位 — 接受在香港就讀的內地學生，以及在大灣區內地城市就讀而持有效來港簽注的內地學生申請；

          -          大灣區內地城市的實習職位 — 接受在香港及大灣區內地城市就讀的香港學生申請。



          實習津貼：

          -          香港的實習職位：港幣12,000 （每月)

          -          大灣區內地城市的實習職位：人民幣10,500 （每月)</p>
      </CardContent>
      <CardFooter className="gap-2 ">

        <Button>
          Apply
        </Button>
        <Button variant={"secondary"}>
          <Bookmark className="h-4 w-4" />
        </Button>
        <Check className=" h-4 w-4" />

      </CardFooter>
    </Card>
  )
}
