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

const InfoCard = () => {
  return(
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of the event" required/>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Cover image</Label>
              <Input id="picture" type="file" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Visbility</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Public</SelectItem>
                  <SelectItem value="sveltekit">HSU Members only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">This is an event</Label>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="starttime">Start Time</Label>
              <Input id="starttime" placeholder="Start time" type={"datetime-local"} required/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endtime">End Time</Label>
              <Input id="endtime" placeholder="End time" type={"datetime-local"}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Online you can type Zoom" required/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Application deadline (Optional)</Label>
              <Input id="name" type={"datetime-local"}/>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
const EditorCard = () => {
  const [data, setData] = useState(blocks);
  return(
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Editor data={data} onChange={setData} holder="editorjs-container" />
      </CardContent>
    </Card>
  )
}
const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});
export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Edit event
        </h1>
        <Link href="/dashboard/edit?action=create">
          <Button>Save</Button>
        </Link>
      </div>
      <InfoCard />
      <EditorCard />
    </section>
  )
}
