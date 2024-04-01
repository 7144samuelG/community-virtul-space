import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/stores/authcontext";
import { listDocs } from "@junobuild/core";
import { useEffect, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";

export const AvailbelCommunities = () => {
  const [data, setData] = useState<any[]>([]);
  const router = useNavigate();
  //const history = useHistory();
  const { user } = useAuthContext();
  useEffect(() => {
    window.addEventListener("reload", list);
    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);
  const list = async () => {
    const { items } = await listDocs({
      collection: "communities",
      filter: {},
    });
    setData(items);
  };
  useEffect(() => {
    (async () => await list())();
  }, [user]);

  
  return (
    <div className=" rounded-md p-5">
      {data.length <= 0 ? (
        <>
          <div className="flex flex-col items-center">
            <p>No available community </p>
            <Button>create commnunity</Button>
          </div>
        </>
      ) : (
        <>
          <div>
            {data.map((val) => (
              <div
                key={val}
                className=" border p-3 rounded-md mb-4 cursor-pointer "
                onClick={() => router(`/chat?key=123`)}
              >
                <Link to="/chart?key=192" >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{val.owner.substring(0, 4)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-semibold">{val.data.name}</h1>
                    <p className="opacity-60">{val.data.topic}</p>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
