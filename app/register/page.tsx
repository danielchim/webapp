'use client'
import { SkeletonCard } from "@/components/skeleton-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAtom, atom } from "jotai";
import { Button } from "@/components/ui/button";
import { supabaseBrowserClient } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string | null;
  hsuId: string | null;
  department: string | null;
  yearOfEntrance: string | null;
}

const infoAtom = atom<FormData>({ name: null, hsuId: null, department: null, yearOfEntrance: null })

export default function IndexPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useAtom(infoAtom)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform any additional validation if needed
    const userData = await supabaseBrowserClient.auth.getUser()
    const { data, error } = await supabaseBrowserClient.from('user').insert({ id: userData.data.user?.id, name: formData.name,email:userData.data.user?.email, hsuId: formData.hsuId, department: formData.department, yearOfEntrance: formData.yearOfEntrance }).select()
    if(data){
      toast({
        title: "Registration successful!",
      })
      window.location.href = '/'
    }
    // Assuming you have an API endpoint for saving the registration data
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Register as member
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="hsuId">HSU ID (Staff/Student)</Label>
                <Input id="hsuId" placeholder="HSU ID" required onChange={(e) => setFormData({ ...formData, hsuId: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Department" required onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="yearOfEntrance">Year of Entrance</Label>
                <Input id="yearOfEntrance" placeholder="Year of Entrance" required onChange={(e) => setFormData({ ...formData, yearOfEntrance: e.target.value })} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <Button type='submit' onClick={handleSubmit}>Save</Button>
        </CardFooter>
      </Card>

    </section>
  );
}

