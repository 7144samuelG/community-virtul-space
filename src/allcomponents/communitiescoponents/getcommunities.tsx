import { useAuthContext } from "@/stores/authcontext";
import { listDocs } from "@junobuild/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Mycommunities = () => {
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
      collection: "communities",
      filter: {},
    });
    setData(items);
  };
  useEffect(() => {
    (async () => await list())();
  }, [user]);
  console.log(data);
  return (
    <div className="p-5">
      {data.length <= 0 ? (
        <>
          <div className="w-full h-[80vh] flex justify-center items-center">
            <p>currently no community created</p>
           
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center mt-6">
            {data.map((val) => (
              <Link to={`/chart?key=${val.key}`} key={val}>
                <div className="w-[200px] h-[200px]  space-y-5">
                  <h1 className="font-semibold text-xl">name:{val.data.name}</h1>
                  <p className="opacity-60">topic:{val.data.topic}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
