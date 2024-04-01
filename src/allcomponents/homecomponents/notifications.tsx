"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@junobuild/core";
import {nanoid} from "nanoid"
import { useToast } from "@/components/ui/use-toast";
import { initJuno, setDoc } from "@junobuild/core";
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
import { Events } from "./events";
type Data={
   
  name: string;
  topic: string;

}
export const Notifications = () => {
  useEffect(() => {

    (async () =>
      await initJuno({
        satelliteId: "2aqvj-kiaaa-aaaal-ai4ga-cai",
      }))();
  }, []);
    const moths=[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "November",
        "December"
    ]
    const closeRef=useRef<ElementRef<"button">>(null);
    const {toast}=useToast()
    const [name,setName]=useState("");
    const [topic,setTopic]=useState("");
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      const comData:Data={
        name:name,
        topic:topic,
      };
     
          const key=nanoid();
          setDoc<Data>({
              collection:"events",
              doc:{
                  key,
                  data:comData
          }})
          closeRef?.current?.click();
          toast({
            
            title:"event have been created successfully"
          })
          setName("")
      setTopic("");
      
      
     
  }
  const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setName(e.target.value)
  }
  const onChange2=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setTopic(e.target.value)
  }
  return (
    <div className="w-[30%] pt-4 pl-8 pr-4">
      <div className="flex justify-end">
        <Button variant="outline" onClick={signOut}>sign-out</Button>
      </div>
      <div>
        <h1>{moths[new Date().getMonth()]}  {new Date().getFullYear()}</h1>
      </div>
      <h1 className="font-semibold my-4">Events,activities,and tasks</h1>
      <div>
        <p>no events,activities or tasks create one</p>
      </div>
      <div>
      <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">new Event</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new Event</DialogTitle>
              <DialogDescription>
                Register a new Event. Click save when you're done.
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
        </div>
        <DialogFooter>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="secondary">
                cancel
              </Button>
            </DialogClose>
          <Button type="submit" >Save changes</Button>
          </div>
        </DialogFooter>
        </form>
          </DialogContent>
        </Dialog>
      </div>
      <Events/>
    </div>
  );
};
