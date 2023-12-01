import { Database } from '@/lib/database.types'
import { HsuEvent } from '@/types/event'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export const revalidate = 0

export async function POST(request: NextRequest) {
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
  const formData = await request.formData();
  const file = formData.get('file') as File
  const metaData:HsuEvent = JSON.parse(formData.get('data') as string)
  console.log(metaData)

  // insert into database
  const res = await supabaseServerClient.auth.getUser()
  const{data, error} = await supabaseServerClient.from('event').update({'event_name':metaData.event_name,'type':metaData.type,'start_date':metaData.start_date,'end_date':metaData.end_date,'location':metaData.location,'application_date':metaData.application_date,'event_data':metaData.event_data,'event_owner':res?.data.user?.id}).eq('id', metaData.id).select('*')
  let fileRes = {}
  if(typeof file !== 'string'){
    fileRes = await supabaseServerClient.storage.from('image').upload(`event/${data?.[0].id}/${metaData.fileName}`, formData.get('file') as File,{
      cacheControl: '3600',
      upsert: false
    });
    const res = await supabaseServerClient.from('event').update({'cover_image_url':fileRes.data.path}).match({'id':data?.[0].id}).select('*')
  }
  // URL to redirect to after sign in process completes
  return NextResponse.json({res: 'ok'})
}
