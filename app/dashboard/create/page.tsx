'use client'

import { EventCard } from "@/components/event-card";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { BlockRenderer } from "@/components/ui/block-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAtom, atom } from "jotai";
import { HsuEvent } from "@/types/event";

const newEventAtom = atom<HsuEvent>({ name: '', picture: null, fileName: null, permission: 0, starttime: null, endtime: null, location: null, applicationDeadline: null, content: {} })
const InfoCard = () => {
  const [formData, setFormData] = useAtom(newEventAtom)
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of the event" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Cover image</Label>
              <Input id="picture" type="file" onChange={(e) => {
                setFormData({ ...formData, picture: e.target.files instanceof FileList ? e.target.files[0] : null, fileName: e.target.files instanceof FileList ? `${e.target.files[0].lastModified}_${e.target.files[0].name}` : '' })
              }} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="permission">Visbility</Label>
              <Select onValueChange={(e) => setFormData({ ...formData, permission: Number(e) })} defaultValue="0">
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Public</SelectItem>
                  <SelectItem value="1">HSU Members only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="starttime">Start Time</Label>
              <Input id="starttime" placeholder="Start time" type={"datetime-local"} onChange={(e) => setFormData({ ...formData, starttime: e.target.value })} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endtime">End Time</Label>
              <Input id="endtime" placeholder="End time" type={"datetime-local"} onChange={(e) => setFormData({ ...formData, endtime: e.target.value })} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Online you can type Zoom" onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="applicationDeadline">Application deadline (Optional)</Label>
              <Input id="applicationDeadline" type={"datetime-local"} onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })} />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
const EditorCard = () => {
  const [editorData, setEditorData] = useAtom(newEventAtom)
  const setData = (data: any) => {
    setEditorData((prev) => ({ ...prev, content: data }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Editor onChange={useCallback((data) => setData(data), [])} holder="editorjs-container" />
      </CardContent>
    </Card>
  )
}
const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

export default function IndexPage() {
  const [formData, setFormData] = useAtom(newEventAtom)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const body = new FormData();
    body.set("file", formData.picture as File);
    body.set("data", JSON.stringify(formData));
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: body
      });
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Create event
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Button>Create</Button>
        </form>
      </div>
      <InfoCard />
      <EditorCard />
    </section>
  )
}
