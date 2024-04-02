import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/stores/authcontext";
import { NFIDProvider, listDocs, signIn } from "@junobuild/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Myevents = () => {
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
  const handleAuth = async() => {
    if (!user) {
      await signIn({
        provider: new NFIDProvider({
          appName: "virtual community space",
          logoUrl: "",
        }),
      });
    } 
  };
  useEffect(() => {
    (async () => await list())();
  }, [user]);
  console.log(data);
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {data.length <= 0 ? (
        <>
          <div className="w-full h-[80vh] flex flex-col justify-center items-center pb-4">
            <p>currently no there is no ongoing event</p>
           {!user &&(
            <>
            <Button onClick={handleAuth}>You must be logged in order to see available events</Button>
            </>
           )}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center mt-6">
            {data.map((val) => (
              <Link to={`/chart?key=${val.key}`} key={val}>
                <div className="w-[200px] h-[200px]  space-y-5">
                <div>
                  <img src={val.data.avatar} className="rounded-md"/>
                </div>
                  <h1 className="font-semibold text-xl">name:{val.data.name}</h1>
                  <p className="opacity-60">topic:{val.data.topic}</p>
                  <Button>Join</Button>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
