
import DashboardInfo from "@/components/dashboard-info";
import { Button } from "@/components/ui/button"
import Link from "next/link";
export const revalidate = 0

export default async function IndexPage({ params }: { params: { slug: string } }) {
  const events = await fetch(`http://localhost:3000/api/events?id=${params.slug}`, {
    method: 'GET',
  }).then(res => res.json());
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {events.data[0].event_name}
        </h1>
        <Link href={`/dashboard/event/${params.slug}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
      <DashboardInfo info={events.data[0]}/>
    </section>
  )
}
