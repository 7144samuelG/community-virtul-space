import { useAuthContext } from "@/stores/authcontext";
import { listDocs } from "@junobuild/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Events = () => {
    const [data, setData] = useState<any[]>([]);

    const { user } = useAuthContext();
    // useEffect(() => {
    //   window.addEventListener("reload", list);
    //   return () => {
    //     window.removeEventListener("reload", list);
    //   };
    // }, []);
    const reload=()=>{
      let event=new Event("reload");
      window.dispatchEvent(event);
    }
   
    const list = async () => {
      const { items } = await listDocs({
        collection: "events",
        filter: {},
      });
      setData(items);
      reload()
    };
    useEffect(() => {
      
      (async () => await list())();
    }, [user]);
 
  return (
    <div>
      <h1 className="font-semibold my-3">Your events</h1>
      <div className="bg-gray-700 rounded-md p-5">
      {data.length <= 0 ? (
        <>
          <div>
            <p>you have not created any community</p>
          </div>
        </>
      ) : (
        <>
          <div>
            {data.map((val) => (
              <div key={val} className="flex flex-col space-y-5">
                <Link to={`/chart?key=${val.key}`}  className="text-blue-500 underline">
                  {val.data.name}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
};
