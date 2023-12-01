'use client'
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import * as React from "react";
import { AuthDialog } from "./auth-dialog"
import { supabaseBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js";



export function SiteHeader() {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null);
  const handleSignOut = async () => {
    await supabaseBrowserClient.auth.signOut()
    router.refresh()
  }
  useEffect(() => {
    supabaseBrowserClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabaseBrowserClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
        <MainNav items={siteConfig.mainNav} />
        <nav className="flex items-center space-x-1">

          <ThemeToggle />
          <React.Suspense fallback={<div>Loading...</div>}>
          {
            session ? (<Button variant={"outline"} onClick={handleSignOut}>Sign out</Button>) : (<AuthDialog />)
          }
          </React.Suspense>
        </nav>
      </div>
    </header>
  )
}
