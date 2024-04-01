import { useAuthContext } from "@/stores/authcontext";
import { listDocs } from "@junobuild/core";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
type comData={}
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
//const messagesKey:string[]=data.filter(val=>val.key==id);

//const flatarr=messagesKey.flat()
//console.log(allMessages,"k")
  return (
    <div className="bg-gray-700 rounded-md p-5">
      {data.length <=0 ? (
        <>
          <div>
            <p>you have not created any community</p>
          </div>
        </>
      ) : (
        <>
          <div>
            
          </div>
        </>
      )}
    </div>
  );
};
