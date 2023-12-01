import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { Database } from "./database.types";

export const supabaseBrowserClient = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
