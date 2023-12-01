'use client'
import { EventCard } from "@/components/event-card";
import { SkeletonCard } from "@/components/skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const EventsByType = ({ type }) => {
  const { data, error, isLoading, isValidating } = useSWR(`/api/events/all?type=${type}`, fetcher);

  if (isLoading || isValidating) {
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
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Public</TabsTrigger>
          <TabsTrigger value="password">Student</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="flex flex-col gap-4">
          <EventsByType type={0} />
        </TabsContent>
        <TabsContent value="password" className="flex flex-col gap-4">
          <EventsByType type={1} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

