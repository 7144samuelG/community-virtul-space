import { Search } from "./search";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/stores/authcontext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { initJuno, setDoc, uploadFile } from "@junobuild/core";
import { Mycommunities } from "./mycommunity";
type Data = {
  name: string;
  topic: string;
  avatarUrl:string
};

export const Main = () => {
  const { user } = useAuthContext();
  const router = useNavigate();
 
  if (!user) {
    router("/");
  }
  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const closeRef = useRef<ElementRef<"button">>(null);
  const[loading,setLoading]=useState<boolean>(false);
  const { toast } = useToast();
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "2aqvj-kiaaa-aaaal-ai4ga-cai",
      }))();
  }, []);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   setLoading(true);
    try {
      let url;
      if (file) {
        const filename: string = `${name}-${topic}`;
        const { downloadUrl } = await uploadFile({
          collection: "communities_images",
          data: file,
          filename,
        });
        url= downloadUrl;
        const key = nanoid();
        const comData: Data = {
          name: name,
          topic: topic,
          avatarUrl:downloadUrl
        };
        await setDoc<Data>({
          collection: "communities",
          doc: {
            key,
            data: comData,
            ...(url !== null && { url }),
          },
        });
        closeRef?.current?.click();
        toast({
          title: "community have been created successfully",
        });
        setName("");
        setTopic("");
        reload();
      }
    } catch (err: any) {
      setLoading(false);
      toast({
        title:"something went wrong"
      })
      console.error(err);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };
  const onChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <div className="pl-10 pt-10 border-r pr-3">
      
      <div className="border-b my-4" />
      <h1 className="py-2 font-semibold">
        Hello there,welcome to acme community virtual space
      </h1>
      <div className="flex justify-between space-x-2 items-center">
        <p>Explore the hub for community updates and activities</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">new Community</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Form a new Community</DialogTitle>
              <DialogDescription>
                Register a new community. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-14">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name of community
                  </Label>
                  <Input
                    id="name"
                    defaultValue=""
                    placeholder="name of community"
                    className="col-span-3"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="topic" className="text-right">
                    topic
                  </Label>
                  <Input
                    id="topic"
                    defaultValue=""
                    value={topic}
                    placeholder="topic "
                    className="col-span-3"
                    onChange={onChange2}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="topic" className="text-right">
                    AvatarImage
                  </Label>
                  <Input
                    id="file"
                    defaultValue=""
                    type="file"
                    placeholder="topic "
                    className="col-span-3 pb-3"
                    onChange={onChange3}
                  />
                </div>
              </div>
              <DialogFooter>
                <div className="flex justify-between">
                  <DialogClose ref={closeRef} asChild>
                    <Button type="button" variant="secondary">
                      cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>Save changes</Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="font-semibold my-5">My Communities</h1>
      <Mycommunities />
    </div>
  );
};
