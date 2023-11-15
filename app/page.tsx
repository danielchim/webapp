'use client'
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import {EventCard} from "@/components/event-card";
import {Editor} from "@/components/ui/editor";
import {useState} from "react";

const blocks = {
  "time": 1550476186479,
  "blocks": [
    {
      "type": "heading",
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
      "type": "heading",
      "data": {
        "text": "Key features",
        "level": 3
      }
    }
  ],
  "version": "2.8.1"
}

export  default function IndexPage() {
  const [data, setData] = useState(blocks);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Events
        </h1>

      </div>
      <EventCard />
      <Editor data={data} onChange={setData} editorblock="editorjs-container" />
    </section>
  )
}
