'use client'

import { EventCard } from "@/components/event-card";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BlockRenderer } from "@/components/ui/block-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link";


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
        "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
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
const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});
export default function IndexPage() {
  const [data, setData] = useState(blocks);
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
        <Link href="/dashboard/edit?action=create">
          <Button>Create</Button>
        </Link>
      </div>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Public</TabsTrigger>
          <TabsTrigger value="password">Student</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="flex flex-col gap-4">
          <EventCard />
          <EventCard />
          <EventCard />
        </TabsContent>
        <TabsContent value="password">
          <BlockRenderer blocks={data} />
        </TabsContent>
        <TabsContent value="department">
          <Editor data={data} onChange={setData} holder="editorjs-container" />
        </TabsContent>
      </Tabs>
    </section>
  )
}
