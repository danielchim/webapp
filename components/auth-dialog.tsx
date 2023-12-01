'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { supabaseBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from "react";

export const AuthDialog = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('123456')
  const handleSignUp = async () => {
    const res = await supabaseBrowserClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/register`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabaseBrowserClient.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue="s216743@hsu.edu.hk"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Student ID
            </Label>
            <Input
              id="studentId"
              defaultValue="s216743"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stuid" className="text-right">
              Password
            </Label>
            <Input
              id="stuid"
              type="password"
              defaultValue="S216743"
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full flex-col gap-2">
            <Button className="w-full" onClick={handleSignIn}>Sign in</Button>
            <Button className="w-full" onClick={handleSignUp}>Sign up</Button>
            <Separator />
            <Button type="submit" className="w-full" variant={"ghost"}>
              Sign in with Google
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
