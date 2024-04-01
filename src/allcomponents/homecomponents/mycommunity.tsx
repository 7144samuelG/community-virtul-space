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
console.log(data)
  return (
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
  );
};
