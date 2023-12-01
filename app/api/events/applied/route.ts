import { Database } from '@/lib/database.types'
import { HsuEvent } from '@/types/event'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export const revalidate = 0

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
  const user = await supabaseServerClient.auth.getUser()
  const res = await supabaseServerClient.from('user_applied_event').select('*,event(id,event_name,event_data)').eq('user_id', user.data?.user?.id!)
  console.log(res)
  return NextResponse.json(res)
}
