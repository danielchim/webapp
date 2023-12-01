'use client'

import { EventCard } from "@/components/event-card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { SkeletonCard } from "@/components/skeleton-card";

export default function IndexPage() {
  const { data, error, isLoading } = useSWR('/api/events/saved', fetcher);

  const renderLoadingState = () => (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Events
        </h1>
      </div>
      <SkeletonCard />
    </section>
  );

  const renderEvents = () => (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Saved Events
        </h1>
      </div>
      {data?.data.length === 0 ? <p>No data found</p> : data?.data.map((savedEvent) => (
        <EventCard key={savedEvent.id} event={savedEvent.event} />
      ))}
    </section>
  );

  return isLoading ? renderLoadingState() : renderEvents();
}

