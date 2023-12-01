import { Database } from '@/lib/database.types'
import { HsuEvent } from '@/types/event'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const supabaseServerClient = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const queryParam = Number(request.nextUrl.searchParams.get('eventId'))
  const res = await supabaseServerClient.from('event_comments').select('*').eq('event_id',queryParam)
  return NextResponse.json(res)
}
