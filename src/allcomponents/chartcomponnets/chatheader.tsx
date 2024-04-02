import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doc, getDoc, initJuno } from "@junobuild/core";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
type dataG = {
  name: string;
  topic: string;
  avatarUrl: string;
};
interface messageData {
  data: dataG;
}
export const ChatHeader = () => {
  const loaction = useLocation();
  const queryParams = new URLSearchParams(loaction.search);
  const id: string = queryParams.get("key") ?? "";
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [odta, setOData] = useState<dataG>({
    name: "",
    topic: "",
    avatarUrl: "",
  });
  useEffect(() => {
    window.addEventListener("reload", fetchData);
    return () => {
      window.removeEventListener("reload", fetchData);
    };
  }, []);
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "2aqvj-kiaaa-aaaal-ai4ga-cai",
      }))();
  }, []);
  const fetchData = async () => {
    const myDoc = (await getDoc({
      collection: "communities",
      key: id,
    })) as Doc<dataG>;
    setOData({
      name: myDoc.data.name,
      topic: myDoc.data.topic,
      avatarUrl: myDoc.data.avatarUrl,
    });
    console.log(odta, "data returned from that key");
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={odta.avatarUrl} />
          </Avatar>
          <div>
            <h1>{odta?.name}</h1>
            <h1>{odta.topic}</h1>
          </div>
        </div>
        <Menu className="cursor-pointer"/>
      </div>
      <div className="border-b py-4"/>
    </div>
  );
};
