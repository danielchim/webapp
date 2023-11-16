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
export const AuthDialog = () => {
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
              id="name"
              defaultValue="s216743@hsu.edu.hk"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Student ID
            </Label>
            <Input
              id="email"
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
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full flex-col gap-2">
            <Button type="submit" className="w-full">Sign in</Button>
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
