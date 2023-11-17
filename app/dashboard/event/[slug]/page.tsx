'use client'

import { EventCard } from "@/components/event-card";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BlockRenderer } from "@/components/ui/block-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";


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
    }
  ],
  "version": "2.8.1"
}

const applicants = [
  {
    userID: "PUB001",
    userName: "Cheung Shum Dawg",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
  },
  {
    userID: "S216743",
    userName: "Chim Ka Hung",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
  },
  {
    userID: "INV001",
    userName: "Norton",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
  },
  {
    userID: "INV001",
    userName: "David",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
  }
]

const comments = [
  {
    userID: "PUB001",
    userName: "Cheung Shum Dawg",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
    comment: "jdoweijdoewjdojwoidwoijdowejdjoewjdowe"
  },
  {
    userID: "S216743",
    userName: "Chim Ka Hung",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
    comment: "jdoweijdoewjdojwoidwoijdowejdjoewjdowe"
  },
  {
    userID: "INV001",
    userName: "Norton",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
    comment: "jdoweijdoewjdojwoidwoijdowejdjoewjdowe"
  },
  {
    userID: "INV001",
    userName: "David",
    userAvatarUrl: "$250.00",
    email: "kahungchim@gmail.com",
    comment: "jdoweijdoewjdojwoidwoijdowejdjoewjdowe"
  }
]

const InfoCard = () => {
  return(
    <Card>
      <CardHeader>
        <CardTitle>Statstics</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row gap-8">
              <div className="max-w-[35]">
                <h3 className="font-bold">30</h3>
                <p>Responds</p>
              </div>
              <div className="min-w-[35]">
                <h3 className="font-bold">30</h3>
                <p>Save</p>
              </div>
              <div className="min-w-[35]">
                <h3 className="font-bold">30</h3>
                <p>View</p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
const PreviewCard = () => {
  const [data, setData] = useState(blocks);
  return(
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <BlockRenderer blocks={blocks}/>
      </CardContent>
    </Card>
  )
}

const ApplicantsPage = () => {
  return(
    <Card>
      <CardHeader>
        <CardTitle>Applicants</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.userID}>
                <TableCell className="font-medium">{applicant.userID}</TableCell>
                <TableCell className="font-medium">{applicant.userName}</TableCell>
                <TableCell>{applicant.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const CommentPage = () => {
  return(
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.userID}>
                <TableCell className="font-medium">{comment.userID}</TableCell>
                <TableCell>{comment.userName}</TableCell>
                <TableCell>{comment.email}</TableCell>
                <TableCell >{comment.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          [Online briefing on 20 Nov] 財庫局: 灣區專上學生金融科技 - 雙向實習計劃 (冬季實習計劃截止報名日期為11月30日) GBA Fintech Two-way Internship Scheme for Post-secondary Students (apply by 30 Nov for winter internship)
        </h1>
        <Link href="/dashboard/event/a/edit">
          <Button>Edit</Button>
        </Link>
      </div>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">General</TabsTrigger>
          <TabsTrigger value="password">Applicants</TabsTrigger>
          <TabsTrigger value="department">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="flex flex-col gap-4">
          <InfoCard />
          <PreviewCard />
        </TabsContent>
        <TabsContent value="password">
          <ApplicantsPage />
        </TabsContent>
        <TabsContent value="department">
          <CommentPage/>
        </TabsContent>
      </Tabs>
    </section>
  )
}
