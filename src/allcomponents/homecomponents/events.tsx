import { useAuthContext } from "@/stores/authcontext";
import { listDocs } from "@junobuild/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Events = () => {
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
        collection: "events",
        filter: {},
      });
      setData(items);
    };
    useEffect(() => {
      
      (async () => await list())();
    }, [user]);
 
  return (
    <div>
      <h1 className="font-semibold my-3">Your events</h1>
      <div className="rounded-md p-5">
      {data.length <= 0 ? (
        <>
          <div>
            <p>you have not created any event</p>
          </div>
        </>
      ) : (
        <>
          <div>
            {data.map((val) => (
              <div key={val} className="flex flex-col items-start space-y-5">
                <Link to={`/chart?key=${val.key}`}  className=" underline">
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
