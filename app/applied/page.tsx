'use client'

import { EventCard } from "@/components/event-card";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BlockRenderer } from "@/components/ui/block-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { SkeletonCard } from "@/components/skeleton-card";

const EventsByType = ({ type }) => {
  const { data, error, isLoading } = useSWR(`/api/events/applied`, fetcher);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (!data?.data || data.data.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <>
      {data?.data.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
};

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Events
        </h1>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="flex flex-col gap-4">
          <EventsByType type={0} />
        </TabsContent>
        <TabsContent value="upcoming" className="flex flex-col gap-4">
          <EventsByType type={1} />
        </TabsContent>
        <TabsContent value="archived" className="flex flex-col gap-4">
          <EventsByType type={1} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
