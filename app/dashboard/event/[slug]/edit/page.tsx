'use client'

import { EventCard } from "@/components/event-card";
import { useCallback, useEffect, useState } from "react";
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
import { DevTools } from "jotai-devtools";
import { SkeletonCard } from "@/components/skeleton-card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const newEventAtom = atom<HsuEvent>({ name: '', picture: null, fileName: null, permission: 0, starttime: null, endtime: null, location: null, applicationDeadline: null, content: {} })
const InfoCard = () => {
  const [formData, setFormData] = useAtom(newEventAtom)
  console.log(formData)
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
              <Input
                id="name"
                placeholder="Name of the event"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    event_name: e.target.value,
                  }))
                }
                value={formData.event_name}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Cover image</Label>
              <Input id="picture" type="file" onChange={(e) => {
                setFormData({ ...formData, picture: e.target.files instanceof FileList ? e.target.files[0] : null, fileName: e.target.files instanceof FileList ? `${e.target.files[0].lastModified}_${e.target.files[0].name}` : '' })
              }} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="permission">Visbility</Label>
              <Select onValueChange={(e) => setFormData({ ...formData, type: Number(e) })} defaultValue="0">
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
    console.log(data)
    setEditorData((prev) => ({ ...prev, event_data: data }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Editor data={editorData.event_data} onChange={useCallback((data) => setData(data), [])} holder="editorjs-container" />
      </CardContent>
    </Card>
  )
}
const Editor = dynamic(() => import("@/components/ui/editor"), {
  ssr: false,
});

export default function IndexPage({ params }: { params: { slug: string } }) {
  const eventId = params.slug;
  const [formData, setFormData] = useAtom(newEventAtom);

  const { data, error, isLoading, isValidating } = useSWR(`/api/events?id=${eventId}`, fetcher, {
    onSuccess: (fetchedData) => {
      if (fetchedData?.data && fetchedData.data.length > 0) {
        setFormData(fetchedData.data[0]);
      }
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const body = new FormData();
    body.set("file", formData.picture as File);
    body.set("data", JSON.stringify(formData));
    try {
      const response = await fetch('/api/events/edit', {
        method: 'POST',
        body: body
      });
    } catch (e) {
      console.log(e)
    }
  }

  const renderLoadingState = () => (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Edit event
        </h1>
      </div>
      <SkeletonCard />
    </section>
  );

  const renderEventData = () => (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <DevTools isInitialOpen />
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Edit event
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Button>Save</Button>
        </form>
      </div>
      {data?.data && data.data.length > 0 ? (
        <>
          <InfoCard eventData={data.data} />
          <EditorCard blocks={data.data[0]?.event_data} />
        </>
      ) : (
        <p>No events available.</p>
      )}
    </section>
  );

  return isLoading || isValidating ? renderLoadingState() : renderEventData();
}
