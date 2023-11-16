'use client'
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import * as React from "react";
import { AuthDialog } from "./auth-dialog"


export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 justify-between sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
        <MainNav items={siteConfig.mainNav} />
        <nav className="flex items-center space-x-1">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <Icons.gitHub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <Icons.twitter className="h-5 w-5 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <ThemeToggle />
          <AuthDialog />
        </nav>
      </div>
    </header>
  )
}
