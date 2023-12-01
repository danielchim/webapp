import { EventCard } from "@/components/event-card";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BlockRenderer } from "@/components/ui/block-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {DashboardCard} from "@/components/dashboard-card";
export const revalidate = 0

export default async function IndexPage() {
  const events = await fetch(`http://localhost:3000/api/dashboard`, {
    method: 'GET',
  }).then(res => res.json());
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
        <Link href="/dashboard/create">
          <Button>Create</Button>
        </Link>
      </div>
      {events.data.map((event: any) => {
        return <DashboardCard key={event.id} id={event.id} eventName={event.event_name} eventOwner={event.owner} appliedCount={32} commentCount={32} eventDescription={event.event_data}/>
      })}
    </section>
  )
}
