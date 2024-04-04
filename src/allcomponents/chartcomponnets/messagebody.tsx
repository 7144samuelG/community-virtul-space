import { useAuthContext } from "@/stores/authcontext";
import { listDocs } from "@junobuild/core";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
interface MyObject {
  created_at: bigint;
  data: {
     messages: string[];
  };
  description?: string; // Optional property
  key: string;
  owner: string;
  updated_at: bigint;
 }
 interface Messages{
  id:number;
  text:string;
 }
export const MessageBody = () => {
    const loaction = useLocation();
    const queryParams = new URLSearchParams(loaction.search);
    const id: string = queryParams.get("key") ?? "";
  const [data, setData] = useState<any[]>([]);

  const { user } = useAuthContext();
  useEffect(() => {
    window.addEventListener("reload", list);
    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);
  const list = async () => {
    const { items } = await listDocs({
      collection: "messages",
      filter: {
      },
    });
    setData(items)
  };
  useEffect(() => {
    
    (async () => await list())();
  }, [user]);
const messagesKey:string[]=data.filter(val=>val.key==id);

//const flatarr=messagesKey.fl/?at()
const owner:MyObject=(messagesKey[0] as any)?.data;
//const owner:mes[]=messagesKey.map(item=>item?.data)
//const [{data,...rest}]=messagesKey;
//console.log(owner,"keyo3o")
const [messages,setMessages]=useState<Messages[]>([])
useEffect(()=>{
  const storedMessages=localStorage.getItem('chatMessages');
  if(storedMessages){
  setMessages(JSON.parse(storedMessages))
}},[]);
console.log(messages)
  return (
    <div className=" rounded-md p-5">
      
      still in development
    </div>
  )
};
