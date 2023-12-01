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
  const queryParam = request.nextUrl.searchParams.get('id')
  if(queryParam){
    const res = await supabaseServerClient.from('event').select('*').eq('id',queryParam).limit(1)
    return NextResponse.json(res)
  }else{
    const res = await supabaseServerClient.from('event').select('*')
    return  NextResponse.json(res)
  }

}

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
  // insert into database
  const res = await supabaseServerClient.auth.getUser()
  const{data, error} = await supabaseServerClient.from('event').insert({'event_name':metaData.name,'type':metaData.permission,'start_date':metaData.starttime,'end_date':metaData.endtime,'location':metaData.location,'application_date':metaData.applicationDeadline,'event_data':metaData.content,'event_owner':res?.data.user?.id}).select('*')
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
