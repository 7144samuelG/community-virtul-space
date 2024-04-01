import { Doc, getDoc, initJuno } from "@junobuild/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
type dataG={
    name:string;
    topic:string;
}
interface messageData{
    data:dataG;
    messages: string[]; 
  }
export const ChatHeader=()=>{
    const loaction = useLocation();
    const queryParams = new URLSearchParams(loaction.search);
    const id: string = queryParams.get("key") ?? "";
    const [name,setName]=useState("");
    const [topic,setTopic]=useState("");
    const [odta,setOData]=useState({})
    useEffect(() => {

        (async () =>
          await initJuno({
            satelliteId: "2aqvj-kiaaa-aaaal-ai4ga-cai",
          }))();
      }, []);
    const fetchData=async()=>{
        const myDoc = await getDoc({
            collection: "communities",
            key: id,
          })as Doc<messageData>;
          setOData(myDoc.data)
         console.log(odta,'h')
    }
    useEffect(()=>{
        fetchData();

    },[])
    return(
        <div>
            <h1>char header</h1>
        </div>
    )
}